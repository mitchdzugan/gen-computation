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
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjAyNjExODg4MCwtMTU5NjQ2NjAwMF19
-->