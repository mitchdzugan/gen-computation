`exec(env, initialState)(comp)` runs `comp` in a reader/writer/state/error monad stack with reader environment `env` and initial state `initialState`. `exec` returns the following object:
```javascript
{
	success: Boolean, // true if `comp` was run in its entirety
	                  // without `fail` being called
	result: Any,      //
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwMzg3NTQyNTksLTE1OTY0NjYwMDBdfQ
==
-->