<script lang="ts">
	import { browser } from '$app/environment';
	import { checkoutFlow } from '@commercetools/checkout-browser-sdk';

	const { data } = $props();

	console.log('data from server', data);
</script>

<svelte:head>
	{#if browser}
		{checkoutFlow({
			projectKey: data.projectKey,
			region: data.region,
			sessionId: data.checkoutSessionId,
			logInfo: true, // Recommended for debugging during development.
			logWarn: true, // Recommended for debugging during development.
			logError: true // Recommended for debugging during development.
		})}
	{/if}
</svelte:head>

Test content
