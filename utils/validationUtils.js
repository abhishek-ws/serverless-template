import joi from 'joi';
import { createError } from '@middy/util';

export const validationMiddleware = (schema) => {
	if (!schema || !joi.isSchema(schema)) {
		console.log('[validationMiddleware] schema is not valid');
		throw new Error('[validationMiddleware] schema is not valid');
	}

	return {
		before: async (request) => {
			const valid = schema.validate(request.event.body);
			if (valid.error) {
				const error = createError(400);
				error.details = valid.error.details.map((detail) => ({
					message: detail.message,
					path: detail.path,
				}));
				throw error;
			}
		},
	};
};
