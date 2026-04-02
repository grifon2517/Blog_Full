export const getLastPageFromLinks = (links) => {
	if (!links) {
		return 1;
	}

	const result = links.match(/_page=(\d+)&_limit=\d+>; rel="last"/);

	if (!result) {
		return 1;
	}

	return Number(result[1]);
};
