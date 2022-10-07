const invalidateUserEvent = new Event('invalidate-user', {
	bubbles: true,
});

/** fires the invalidate-user event to force logout on authentication errors */
const invalidateUser = () => {
	window.dispatchEvent(invalidateUserEvent);
};

export {
	invalidateUser,
};
