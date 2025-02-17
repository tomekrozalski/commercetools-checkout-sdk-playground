import { env } from '$env/dynamic/private';

export const load = async () => {
	/*
	 * ToRefactor START
	 */
	const tokenResponse = await fetch(
		`https://auth.${env.CTP_REGION}.${env.CTP_CLOUD_PROVIDER}.commercetools.com/oauth/token`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(`${env.CTP_CLIENT_ID}:${env.CTP_CLIENT_SECRET}`).toString('base64')}`
			},
			body: 'grant_type=client_credentials'
		}
	);
	const { access_token } = await tokenResponse.json();
	/*
	 * ToRefactor END
	 */

	const checkoutSessionResponse = await fetch(
		`https://session.${env.CTP_REGION}.${env.CTP_CLOUD_PROVIDER}.commercetools.com/${env.CTP_PROJECT_KEY}/sessions`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${access_token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cart: {
					cartRef: {
						id: env.CART_ID
					}
				},
				metadata: {
					applicationKey: env.CHECKOUT_APPLICATION_KEY
				}
			})
		}
	);

	const { id } = await checkoutSessionResponse.json();

	return {
		checkoutSessionId: id,
		projectKey: env.CTP_PROJECT_KEY,
		region: env.CTP_REGION
	};
};
