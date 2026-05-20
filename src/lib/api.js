import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const _cache = new Map();
const _inflight = new Map();

const CACHE_TTL = 1000 * 60 * 2; // 2 minutes

function cachedFetch(key, fn) {
    const now = Date.now();

    const cached = _cache.get(key);

    if (cached && now - cached.ts < CACHE_TTL) {
        return Promise.resolve(cached.data);
    }

    const inflight = _inflight.get(key);

    if (inflight) return inflight;

    const p = fn()
        .then((res) => {
            _cache.set(key, {
                ts: Date.now(),
                data: res,
            });

            _inflight.delete(key);

            return res;
        })
        .catch((err) => {
            _inflight.delete(key);
            throw err;
        });

    _inflight.set(key, p);

    return p;
}

export const api = {
    auth: {
        login: async (credentials) => {
            const response = await apiClient.post("/login", credentials);
            return response.data;
        },

        signup: async (credentials) => {
            const response = await apiClient.post("/signup", credentials);
            return response.data;
        },

        logout: async () => {
            const response = await apiClient.get("/logout");
            return response.data;
        },

        me: async () => {
            const response = await apiClient.get("/me");
            return response.data;
        },
    },

    companies: {
        list: async (page, limit) => {
            if (page == null) {
                return cachedFetch("companies:list", async () => {
                    const response = await apiClient.get("/list");

                    const items = response.data?.data || [];

                    return Array.isArray(items)
                        ? items.map((item) => ({
                            ...item,
                            id: item._id || item.id,
                        }))
                        : [];
                });
            }

            const params = { page, limit };

            const key = `companies:list:${page}:${limit}`;

            return cachedFetch(key, async () => {
                const response = await apiClient.get("/list", { params });

                const payload = response.data || {};

                const items = payload.data || payload.items || [];

                const mapped = Array.isArray(items)
                    ? items.map((item) => ({
                        ...item,
                        id: item._id || item.id,
                    }))
                    : [];

                return {
                    items: mapped,

                    meta: {
                        page: payload.currentPage || page,
                        totalPages: payload.totalPages || 1,
                        total: payload.total || mapped.length,
                        limit: Number(limit),
                    },
                };
            });
        },

        create: async (data) => {
            const response = await apiClient.post("/create", data);

            for (const k of Array.from(_cache.keys())) {
                if (k.startsWith("companies:list")) {
                    _cache.delete(k);
                }
            }

            return response.data;
        },

        update: async (id, data) => {
            const response = await apiClient.put(`/update/${id}`, data);

            for (const k of Array.from(_cache.keys())) {
                if (k.startsWith("companies:list")) {
                    _cache.delete(k);
                }
            }

            return response.data;
        },

        delete: async (id) => {
            const response = await apiClient.delete(`/delete/${id}`);

            for (const k of Array.from(_cache.keys())) {
                if (k.startsWith("companies:list")) {
                    _cache.delete(k);
                }
            }

            return response.data;
        },

        apply: async (jobId, applicationData) => {
            const response = await apiClient.post(
                `/apply/${jobId}`,
                applicationData,
            );

            return response.data;
        },

        jobdetails: async (jobId) => {
            const response = await apiClient.get(`/jobs/${jobId}`);

            return response.data;
        },
    },

    testimonials: {
        list: async () => {
            return cachedFetch("testimonials:list", async () => {
                const response = await apiClient.get("/testimonials");

                const items = response.data || [];

                return Array.isArray(items)
                    ? items.map((item) => ({
                        ...item,
                        id: item._id || item.id,
                    }))
                    : [];
            });
        },

        create: async (data) => {
            const response = await apiClient.post("/testimonials/add", data);

            _cache.delete("testimonials:list");

            return response.data;
        },

        delete: async (id) => {
            const response = await apiClient.delete(`/testimonial/${id}`);

            _cache.delete("testimonials:list");

            return response.data;
        },
    },

    applicants: {
        list: async (page = 1, limit = 10, status) => {
            const params = {
                page,
                limit,
            };

            if (status && status !== "all") {
                params.applicantStatus = status;
            }

            const response = await apiClient.get("/applicants", {
                params,
            });

            const payload = response.data || {};

            const items = payload.applicants || [];

            const mapped = items.map((item) => ({
                ...item,
                id: item._id || item.id,
            }));

            return {
                items: mapped,

                meta: {
                    page: payload.currentPage || page,
                    totalPages: payload.totalPages || 1,
                    total: payload.totalApplicants || mapped.length,
                    limit: Number(limit),
                },
            };
        },

        get: async (id) => {
            const response = await apiClient.get(`/applicant/${id}`);

            const payload = response.data || {};

            const applicant = payload.data;

            if (!applicant) {
                throw new Error("Applicant not found");
            }

            return {
                ...applicant,

                id: applicant._id || applicant.id,

                name: applicant.fullName,

                status: applicant.applicantStatus,

                applied_job: applicant.job,
            };
        },

        updateStatus: async (id, status) => {
            const response = await apiClient.put(
                `/applicant/${id}/status`,
                {
                    applicantStatus: status,
                },
            );

            return response.data;
        },

        excel: async (opts) => {
            const params = {};

            if (opts.range) {
                params.range = opts.range;
            }

            if (opts.startDate) {
                params.startDate = opts.startDate;
            }

            if (opts.endDate) {
                params.endDate = opts.endDate;
            }

            if (
                opts.applicantStatus &&
                opts.applicantStatus !== "all"
            ) {
                params.applicantStatus = opts.applicantStatus;
            }

            const response = await apiClient.get(
                `/applicants/excel`,
                {
                    params,
                    responseType: "blob",
                },
            );

            return response.data;
        },
    },

    enquiries: {
        list: async (page = 1, limit = 10, status) => {
            const params = {
                page,
                limit,
            };

            if (status && status !== "all") {
                params.status = status;
            }

            const response = await apiClient.get("/enquiries", {
                params,
            });

            const payload = response.data || {};

            const items = payload.enquiries || payload.items || [];

            const mapped = items.map((item) => ({
                ...item,
                id: item._id || item.id,
            }));

            return {
                items: mapped,

                meta: {
                    page: payload.currentPage || page,
                    totalPages: payload.totalPages || 1,
                    total:
                        payload.totalEnquiries ||
                        payload.total ||
                        mapped.length,
                    limit: Number(limit),
                },
            };
        },

        get: async (id) => {
            const response = await apiClient.get(`/enquiry/${id}`);

            const payload = response.data || {};

            const enquiry =
                payload.data || payload.enquiry || payload;

            if (!enquiry) {
                throw new Error("Enquiry not found");
            }

            return {
                ...enquiry,
                id: enquiry._id || enquiry.id,
            };
        },

        delete: async (id) => {
            const response = await apiClient.delete(
                `/enquiry/delete/${id}`,
            );

            return response.data;
        },

        create: async (data) => {
            const response = await apiClient.post("/enquiry", data);

            return response.data;
        },
    },

    hiringPartners: {
        list: async () => {
            return cachedFetch("partners:list", async () => {
                const response = await apiClient.get("/partner/list");

                const items = response.data?.data || [];

                return Array.isArray(items)
                    ? items.map((item) => ({
                        ...item,
                        id: item._id || item.id,
                    }))
                    : [];
            });
        },

        create: async (data) => {
            const response = await apiClient.post(
                "/partner/create",
                data,
            );

            _cache.delete("partners:list");

            return response.data;
        },

        delete: async (id) => {
            const response = await apiClient.delete(
                `/partner/delete/${id}`,
            );

            _cache.delete("partners:list");

            return response.data;
        },
    },
};