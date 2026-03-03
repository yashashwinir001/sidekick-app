export const load = async () => {
	return {};
};
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		// TEMP HARDCODE CHECK (for testing)
		if (email === 'admin@gmail.com' && password === '1234') {
			throw redirect(303, '/');
		}

		return fail(400, {
			message: 'Invalid email or password'
		});
	}
};
