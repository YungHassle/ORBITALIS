/**
 *
 * @param {object} options
 * @param {string} options.from
 * @param {string} options.localField
 * @param {string} [options.foreignField]
 * @param {string} [options.as]
 * @param {boolean} [options.oneItem]
 * @returns
 */
export function justLookup(options = {}) {
	if (Object.keys(options).length == 0) return []
	const pipe = []

	const as = options?.as || options?.localField

	pipe.push({
		$lookup: {
			from: options?.from,
			localField: options?.localField,
			foreignField: options?.foreignField || "_id",
			as,
		},
	})

	if (options?.oneItem) {
		pipe.push({
			$set: {
				[as]: {
					$arrayElemAt: [`$${as}`, 0],
				},
			},
		})
	}

	return pipe
}
