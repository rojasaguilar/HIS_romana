import { api } from "@/shared/lib/axios";

import type { Speciality } from "../types/speciality.types";

export const getSpecialitiesRequest = async (): Promise<Speciality[]> => {
  const response = await api.get("/specialities");

  return response.data;
};

export const createSpecialityRequest = async (data: {
  name: string;
}): Promise<Speciality> => {
  const response = await api.post("/specialities", data);

  return response.data;
};
