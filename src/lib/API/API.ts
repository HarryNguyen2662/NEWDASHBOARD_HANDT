const config = {
  apiKey: process.env.REACT_APP_API_KEY,
};

const baseUrl = "https://handtaitech-a0952bbd1beb.herokuapp.com/v1";
//const baseUrl = "http://localhost:3000/v1";

const fetchInstance = async (url: string, options: RequestInit = {}) => {
  const headers = {
    "x-api-key": config.apiKey,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: headers as HeadersInit,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

export const TrungTamAPI = {
  getTrungTamById: async (id: string) => {
    try {
      return await fetchInstance(`/trungtam/${id}`);
    } catch (error) {
      throw new Error("Failed to load Trung Tam by Id");
    }
  },

  getTrungTamByEmail: async (email: string) => {
    try {
      return await fetchInstance(`/trungtam/authtrungtambyEmail/${email}`);
    } catch (error) {
      throw new Error("Failed to load Trung Tam by Email");
    }
  },

  getTrungTamLISTHS: async (id: string, page: number, limit: number) => {
    try {
      return await fetchInstance(`/trungtam/${id}/listHS/${page}/${limit}`);
    } catch (error) {
      throw new Error("Failed to load Hoc Vien Trung Tam");
    }
  },

  getTrungTamLISTGV: async (id: string, page: number, limit: number) => {
    try {
      return await fetchInstance(`/trungtam/${id}/listGV/${page}/${limit}`);
    } catch (error) {
      throw new Error("Failed to load Giao Vien Trung Tam");
    }
  },

  getTrungTamLISTLH: async (id: string, page: number, limit: number) => {
    try {
      return await fetchInstance(`/trungtam/${id}/listLH/${page}/${limit}`);
    } catch (error) {
      throw new Error("Failed to load Lop Hoc Trung Tam");
    }
  },

  getTrungTamLISTKH: async (id: string, page: number, limit: number) => {
    try {
      return await fetchInstance(`/trungtam/${id}/listKH/${page}/${limit}`);
    } catch (error) {
      throw new Error("Failed to load Khoa Hoc Trung Tam");
    }
  },

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  updateTrungTam: async (id: string, body: any) => {
    try {
      return await fetchInstance(`/trungtam/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    } catch (error) {
      throw new Error("Failed to update Trung Tam");
    }
  },

  deleteTrungTam: async (id: string) => {
    try {
      return await fetchInstance(`/trungtam/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error("Failed to delete Trung Tam");
    }
  },

  getKhoaHocList: async () => {
    try {
      return await fetchInstance("/khoahoc");
    } catch (error) {
      throw new Error("Failed to load Khoa Hoc list");
    }
  },

  getLopHocList: async () => {
    try {
      return await fetchInstance("/lophoc");
    } catch (error) {
      throw new Error("Failed to load Lop Hoc list");
    }
  },
};

export const GiaoVienAPI = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createGiaoVien: async (giaoVienBody: any) => {
    try {
      return await fetchInstance("/giaovien", {
        method: "POST",
        body: JSON.stringify(giaoVienBody),
      });
    } catch (error) {
      throw new Error("Failed to create Giao Vien");
    }
  },
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  updateGiaoVien: async (giaoVienBody: any, id: string) => {
    try {
      return await fetchInstance(`/giaovien/${id}`, {
        method: "PATCH",
        body: JSON.stringify(giaoVienBody),
      });
    } catch (error) {
      throw new Error("Failed to update Giao Vien");
    }
  },
  searchingGiaoVien: async (keyword: string, ma_don_vi: string) => {
    try {
      return await fetchInstance("/giaovien/searching", {
        method: "POST",
        body: JSON.stringify({ keyword, ma_don_vi }),
      });
    } catch (error) {
      throw new Error("Failed to search Giao Vien");
    }
  },
  deleteGiaoVien: async (id: string): Promise<Response> => {
    try {
      return await fetchInstance(`/giaovien/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error("Failed to delete Giao Vien. Please try again later.");
    }
  },

  getGiaoVienList: async () => {
    try {
      return await fetchInstance("/giaovien");
    } catch (error) {
      throw new Error("Failed to load Giao Vien list");
    }
  },
};

export const HocVienAPI = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createHocVien: async (hocVienBody: any) => {
    try {
      return await fetchInstance("/hocvien", {
        method: "POST",
        body: JSON.stringify(hocVienBody),
      });
    } catch (error) {
      throw new Error("Failed to create Hoc Vien");
    }
  },
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  updateHocVien: async (hocVienBody: any, id: string) => {
    try {
      return await fetchInstance(`/hocvien/${id}`, {
        method: "PATCH",
        body: JSON.stringify(hocVienBody),
      });
    } catch (error) {
      throw new Error("Failed to update Hoc Vien");
    }
  },
  searchingHocVien: async (keyword: string, madonvi: string) => {
    try {
      return await fetchInstance("/hocvien/searching", {
        method: "POST",
        body: JSON.stringify({ keyword, madonvi }),
      });
    } catch (error) {
      throw new Error("Failed to search Hoc Vien");
    }
  },
  deleteHocVien: async (id: string): Promise<Response> => {
    try {
      return await fetchInstance(`/hocvien/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error("Failed to delete Hoc Vien. Please try again later.");
    }
  },

  getHocVienList: async () => {
    try {
      return await fetchInstance("/hocvien");
    } catch (error) {
      throw new Error("Failed to load Hoc Vien list");
    }
  },
};

export const LopHocAPI = {
  createLopHoc: async (lopHocBody: any) => {
    try {
      return await fetchInstance("/lophoc", {
        method: "POST",
        body: JSON.stringify(lopHocBody),
      });
    } catch (error) {
      throw new Error("Failed to create Lop Hoc");
    }
  },

  getLopHoc: async () => {
    try {
      return await fetchInstance("/lophoc");
    } catch (error) {
      throw new Error("Failed to load Lop Hoc");
    }
  },

  getLopHocById: async (id: string) => {
    try {
      return await fetchInstance(`/lophoc/${id}`);
    } catch (error) {
      throw new Error("Failed to load Lop Hoc by Id");
    }
  },

  updateLopHoc: async (id: string, lopHocBody: any) => {
    try {
      return await fetchInstance(`/lophoc/${id}`, {
        method: "PATCH",
        body: JSON.stringify(lopHocBody),
      });
    } catch (error) {
      throw new Error("Failed to update Lop Hoc");
    }
  },

  deleteLopHoc: async (id: string) => {
    try {
      return await fetchInstance(`/lophoc/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error("Failed to delete Lop Hoc");
    }
  },

  authLopHoc: async (maLopHoc: string) => {
    try {
      return await fetchInstance(`/lophoc/authlophoc/${maLopHoc}`);
    } catch (error) {
      throw new Error("Failed to authenticate Lop Hoc");
    }
  },

  searchingLopHoc: async (keyword: string, ma_don_vi: string) => {
    try {
      return await fetchInstance("/lophoc/searching", {
        method: "POST",
        body: JSON.stringify({ keyword, ma_don_vi }),
      });
    } catch (error) {
      throw new Error("Failed to search Lop Hoc");
    }
  },
};
export const KhoaHocAPI = {
  createKhoaHoc: async (khoaHocBody: any) => {
    try {
      return await fetchInstance("/khoahoc", {
        method: "POST",
        body: JSON.stringify(khoaHocBody),
      });
    } catch (error) {
      throw new Error("Failed to create Khoa Hoc");
    }
  },

  getKhoaHoc: async () => {
    try {
      return await fetchInstance("/khoahoc");
    } catch (error) {
      throw new Error("Failed to load Khoa Hoc");
    }
  },

  getKhoaHocById: async (id: string) => {
    try {
      return await fetchInstance(`/khoahoc/${id}`);
    } catch (error) {
      throw new Error("Failed to load Khoa Hoc by Id");
    }
  },

  updateKhoaHoc: async (id: string, khoaHocBody: any) => {
    try {
      return await fetchInstance(`/khoahoc/${id}`, {
        method: "PATCH",
        body: JSON.stringify(khoaHocBody),
      });
    } catch (error) {
      throw new Error("Failed to update Khoa Hoc");
    }
  },

  deleteKhoaHoc: async (id: string) => {
    try {
      return await fetchInstance(`/khoahoc/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error("Failed to delete Khoa Hoc");
    }
  },

  searchingKhoaHoc: async (keyword: string, ma_don_vi: string) => {
    try {
      return await fetchInstance("/khoahoc/searching", {
        method: "POST",
        body: JSON.stringify({ keyword, ma_don_vi }),
      });
    } catch (error) {
      throw new Error("Failed to search Khoa Hoc");
    }
  },
};
