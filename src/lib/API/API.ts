const config = {
  apiKey: process.env.REACT_APP_API_KEY,
};

const baseUrl = "https://handtaitech-a0952bbd1beb.herokuapp.com/v1";

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

  getTrungTamLISTHS: async (id: string) => {
    try {
      return await fetchInstance(`/trungtam/${id}/listHS`);
    } catch (error) {
      throw new Error("Failed to load Hoc Vien Trung Tam");
    }
  },

  getTrungTamLISTGV: async (id: string) => {
    try {
      return await fetchInstance(`/trungtam/${id}/listGV`);
    } catch (error) {
      throw new Error("Failed to load Giao Vien Trung Tam");
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
  searchingGiaoVien: async (keyword: string, matrungtam: string) => {
    try {
      return await fetchInstance(`/giaovien/searching`, {
        method: "POST",
        body: JSON.stringify({ keyword, matrungtam }),
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
  searchingHocVien: async (keyword: string, matrungtam: string) => {
    try {
      return await fetchInstance(`/hocvien/searching`, {
        method: "POST",
        body: JSON.stringify({ keyword, matrungtam }),
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
};
