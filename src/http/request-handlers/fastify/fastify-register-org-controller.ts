import { IOrg } from '@/custom-types/org-interface';
import { FastifyRequest, FastifyReply } from 'fastify';
import { registerOrgController } from '@/http/controllers/register-org-controller';
import { OrgEmailAlreadyExistsError } from '@/services/errors/org-email-already-exists-error';

export const fastifyRegisterOrgController = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  console.log('hello');

  try {
    const data = await registerOrgController(request.body as IOrg);

    return response.status(201).send(data);
  } catch (err) {
    if (err instanceof OrgEmailAlreadyExistsError) {
      return response.status(409).send({ message: err.message });
    }

    throw err;
  }
};
