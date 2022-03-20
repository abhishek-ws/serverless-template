import { apiSuccess, apiFailure } from '@utils';
import { getOrganizations } from '@services/github';

export const handler = async (event, _context, callback) => {
	console.log(JSON.stringify(event));
	try {
		const { orgName } = event.queryStringParameters || '';
		const response = await getOrganizations(orgName);
		return apiSuccess(callback, response);
	} catch (error) {
		console.error(error);
		return apiFailure(callback, error);
	}
};
