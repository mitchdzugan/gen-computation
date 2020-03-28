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

the rest of the api functions are as follows, no typing is enforced but for the purposes of explaining the types of the api functions. We will use the following types:
```javascript
	R // represents the type of the object `env` passed to `exec`
	S // represents the type of the state, initially 
	  // supplied to `exec` as `initialState`
	W // 
```

monad control flow is obtained using generators. for example:

```javascript
const comp = (function* () {
	
})();
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTcwOTM5NDA5NiwyMDI2MzczMTUsLTE1OT
Y0NjYwMDBdfQ==
-->