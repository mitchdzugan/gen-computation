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
asks(R => a) => a // 
```

monad control flow is obtained using generators. for example:

```javascript
const comp = (function* () {
	
})();
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNDk5MzkzNjg3LDIwMjYzNzMxNSwtMTU5Nj
Q2NjAwMF19
-->