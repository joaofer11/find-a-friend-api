import { z } from 'zod';
import { BrasilAPI } from '@/lib/brasil-api';
import { IOrg } from '@/custom-types/org-interface';
import { validateEmail } from '@/utils/validate-email';
import { BRAZIL_STATES } from '@/constants/brazil-states';
import { makeRegisterOrgService } from '@/services/factories/make-register-org-service';

export const registerOrgController = async (data: IOrg) => {
  const basicBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    email: z.string().nonempty(),
    password: z.string().min(6),
    state: z.enum(BRAZIL_STATES),
    city: z.string().nonempty(),
    address: z.string().nonempty(),
    postalCode: z.string(),
    whatsAppNumber: z.string(),
  });

  const parsedBody = basicBodySchema.parse(data);

  if (!validateEmail(parsedBody.email)) {
    throw new Error('Please provide a valid email format.');
  }

  const brasilApi = new BrasilAPI();
  await brasilApi.getLocationByPostalCode(data.postalCode);

  const registerOrgService = makeRegisterOrgService();

  const { org } = await registerOrgService.execute(data);

  return {
    org,
  };
};
