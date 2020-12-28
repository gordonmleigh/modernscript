# modernscript

Run modern javascript/typescript without thinking about it.

This sets up some [sucrase](https://github.com/alangpierce/sucrase) hooks to process typescript and `import`/`export` statements, including in `node_modules`.

## Usage

Use the require hook:

```
node -r modernscript/register myscript.ts
```

Use `runjs` command

```
runjs myscript.ts
```

## Credits

- [Sucrase](https://github.com/alangpierce/sucrase): Super-fast alternative to Babel for when you can target modern JS runtimes
- [Pirates](https://github.com/ariporad/pirates): Properly hijack require
