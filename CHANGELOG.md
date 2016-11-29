v1.0.2 / 2016-11-28
===================

  * bump version to 1.0.2
  * fix proxy null check #32

v1.0.1 / 2016-11-25
===================

  * bump version to 1.0.1
  * improve mock exception messages #31

v1.0.0 / 2016-11-24
===================

  * update browser installation readme section
  * bump version to 1.0.0
  * fix reference path in readme
  * add files to package.json
  * remove .npmignore
  * fix postinstall build #26
  * enable npm install github #26
  * remove bower
  * log to console when Proxy not available in a test #20
  * add dynamic mocking #20
  * update readme to reflect previous api change
  * change api to return mock interfaces
  * ignore .vscode
  * use reference equality for implicit object matcher #28
  * hk
  * verify invocation order #29
  * allow implicit object value param as setup matcher #28
  * add compilerOptions.typeRoots
  * proper mock reset #27
  * repackage typemoq as an UMD module #25
  * refactor build script
  * move away from VS to VSCode
  * target method overridden by corresponding return func #21
  * add lodash dependency to nuspec
  * clone target instance at mock instantiation
  * replace Underscore with Lodash
  * rename 'output' to 'typemoq' #24
  * enable chaining of callback and verifiable #23
  * change Exception to extend from Error #22
  * update to typescript 2.0

v0.3.3 / 2016-08-28
===================

  * update dist files
  * bump version to 0.3.3
  * add support for mock reset #18
  * update build file
  * add string values to MockExceptionReason

v0.3.2 / 2016-07-22
===================

  * update dist files
  * bump version to 0.3.2
  * update readme
  * improve mockability of getters/setters

v0.3.1 / 2016-07-17
===================

  * update dist files
  * bump version to 0.3.1
  * fix require underscore statement
  * update dist files
  * exclude src/tsconfig.json from build output
  * bump version to 0.3.0
  * update readme with latest changes since 0.2.0
  * change predicate matcher return type to T
  * add predicate matcher #14
  * change .verifiable to take a Times param #13
  * revert param order of GobalMock.ofInstance/ofType
  * add ES6 testing for node.js #7
  * Merge pull request #15 from rkostrzewski/master
  * set GlobalMock.globalName default equal to Mock.name
  * use function.name when available
  * change test to reference only the output of src
  * add tsconfig.json to src and test
  * Enabled ES6 classes support
  * change some interfaces to type aliases
  * update readme to use 'let' declarations
  * change 'var' to 'let' declarations

v0.2.0 / 2016-06-12
===================

  * update dist files
  * bump version to 0.2.0
  * add Content/Script folder and ref to underscore.js
  * hk
  * support TypeScript 1.6 npm package typing resolving #4

v0.1.1 / 2016-06-06
===================

  * update dist files
  * bump version to 0.1.1
  * record/replay in the same order (not reversed as before)
  * support for record/replay scenarios
  * update readme - only ES5 support atm
  * readme minor updates
  * correction in doc for node install

v0.1.0 / 2016-05-26
===================

  * update dist files
  * bump version to 0.1.0
  * update readme file to reflect improved support for browser and node
  * update travis script to run mocha testing
  * add mocha testing to build script
  * improve runtime support for browser and node
  * start refactoring tests to enable runtime separation (browser vs node)
  * add test case - class as ctor param and cast result to interface
  * update doc - add nuget install info
  * support TypeScript 1.6 npm package typing resolving
  * Merge pull request #6 from lowkay/master
  * Fix ExtractProxyCall from mutating the context
  * switch to using latest stable node.js
  * update csproj
  * add Edge to karma SL launchers
  * fix "Cannot find namespace 'chai'"
  * fix a semantic error
  * Merge pull request #2 from the-vk/master
  * Fixed exception thrown in Exception.toString()

v0.0.6 / 2015-09-10
===================

  * update bower pkg
  * update doc
  * update bower pkg
  * update bower pkg
  * prep bower packaging
  * bump version to 0.0.6
  * export TypeMoq object for node.js
  * add sauce
  * check for phantomjs
  * add nuspec file
  * bump version to 0.0.5
  * change prop desc handling in global scope
  * update readme file
  * skip some tests in phantomjs
  * add global objects mocking
  * bump version to 0.0.4
  * bump version to 0.0.3
  * bundle up output with dependencies
  * bump version to 0.0.2
  * Revert "update bower info"
  * update bower info
  * update package info
  * add build badge url
  * add readme file
  * add license file
  * add separate phantomjs runner for travis ci
  * hk travis ci
  * hk
  * add travis ci
  * first working prototype
  * hk
  * initial
  * :neckbeard: Added .gitattributes & .gitignore files


