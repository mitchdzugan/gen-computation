const _ = require('./index');

const getNodesWithChildrenSum = (target, root) => {
	const comp = (node) => (function* () {
		if (!node) {
			return 0;
		}
		const leftSum = yield* comp(node.left);
		const rightSum = yield* comp(node.right);
		const childrenSum = leftSum + rightSum;
		if (childrenSum === target) {
			yield* _.tell(node.id);
		}
		return childrenSum + node.value;
	})();
	return _.exec()(comp(root)).writer;
};

const tree = {
	id: "root",
	value: 8,
	left: {
		id: "0",
		value: 7,
		left: {
			id: "00",
			value: 4,
			left: { id: "000", value: 6 },
			right: { id: "001", value: 3 },
		},
		right: { id: "01", value: 9 },
	},
	right: {
		id: "1",
		value: 5,
		left: {
			id: "10",
			value: 1,
			left: {
				id: "110", value: 2,
				left: { id: "1100", value: 1 }
			},
			right: { id: "101", value: 2 }
		},
		right: {
			id: "11",
			value: 2,
			right: { id: "111", value: 1 }
		}
	},
};

describe("exec/tell", () => {
	it("should work", () => {
		expect(getNodesWithChildrenSum(9, tree)).toEqual(["00", "1"]);
	});
});
