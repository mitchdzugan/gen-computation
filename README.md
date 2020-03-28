`exec(env, initialState)(comp)` runs `comp` in a reader/writer/state/error monad stack with reader environment `env` and initial state `initialState`. `exec` returns the following object:
```javascript
{
	success: Boolean,  // true if `comp` was run in its entirety
	                   // without `fail` being called
	result: Any,       // value returned by `comp`
	error: Any,        // value supplied to `fail` if it was called
	state: Any,        // value of state monad at the end of `comp`
	writer: Array[Any] // array containing every value that supplied to
	                   // `tell` in order during the execution of `comp`
}
```

No typing is enforced but for the purposes of explaining the types of the api functions. We will use the following types:
```javascript
	R // represents the type of the object `env` passed to `exec`
	
	S // represents the type of the state, initially 
	  // supplied to `exec` as `initialState`
	  
	W // represents the type of objects written to the writer array via `tell`
	
	E // represents the type of errors thrown by `fail`
```

The rest of the API functions are as follows:
```javascript
ask() => R // yields the value stored in the reader environment

asks(R => a) => a // given a function, yields the result of applying
                  // that function to the value in the reader environment
                  
tell(W) => null // adds the supplied argument to the writer array

get() => S // yields the current state managed by the state monad

gets(S => a) => a // given a function, yields the result of applying
                  // that function to the current state in the state monad
                  
put(S) => null // sets the current state of the state monad to the supplied value

modify(S => S) => null // sets the current state of the state monad to the result
                       // of applying the supplied function to the current state
```

monad control flow is obtained using generators. 


```javascript
const getNodesWithChildrenSum = (target, root) => {
	const comp = (node) => (function* () {
		if (!node) {
			return 0;
		}
		const leftSum = yield* comp(node.left);
		const rightSum = yield* comp(node.right);
		const childrenSum = leftSum + rightSum;
		if (childrenSum === target) {
			yield* tell(node.value);
		}
		return childrenSum;
	})();
	return exec()(root).writer;
};
```
We could use this function to find the ID of all nodes in the following tree whose children sum to the value: 9.
```
                                    ["root", 8]
                ["0", 7]                                   ["1", 5]
      ["00", 4]          ["01", 9]              ["10", 1]           ["11", 2]
["000", 6]  ["001", 3]                    ["110", 2]  ["101", 2]          ["111", 1]
                                     ["1100", 1]
```
```javascript
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
expect(getNodesWithChildrenSum(9, tree)).toEqual(["00", "1"]);

```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI0NjU2MDA1Myw4NTUzMTA3MzIsLTE1Nz
U5NzU1MTgsMjAyNjM3MzE1LC0xNTk2NDY2MDAwXX0=
-->