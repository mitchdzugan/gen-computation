`exec(env, initialState)(comp)` runs `comp` in a reader/writer/state/error monad stack with reader environment `env` and initial state `initialState`. `exec` returns the following object:
```javascript
{
	success: Boolean,  // true if `comp` was run in its entirety
	                   // without `fail` being called
	result: Any,       // value returned by `comp`
	error: Any,        // value supplied to `fail` if it was called
	state: Any,        // value of state monad at the end of `comp`
	writer: Array[Any] // array containing every value that supplied
	                   // to `tell` in order during the execution
	                   // of `comp`
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

Here is an example predominantly using

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
};
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2MjgzNDkxNTYsMjAyNjM3MzE1LC0xNT
k2NDY2MDAwXX0=
-->