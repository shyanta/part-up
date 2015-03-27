Package.describe({
	name: "velocity:test-proxy",
	summary: "Dynamically created package to expose test files to mirrors",
	version: "0.0.4",
	debugOnly: true
});

Package.onUse(function (api) {
	api.use("coffeescript", ["client", "server"]);
	api.add_files("tests/mocha/client/_wait_for_router_helper.js",["client"]);
	api.add_files("tests/mocha/client/discover/discoverTest.js",["client"]);
	api.add_files("tests/mocha/client/partup-detail/activitiesTest.js",["client"]);
	api.add_files("tests/mocha/client/partup-detail/partup-detailTest.js",["client"]);
	api.add_files("tests/mocha/client/register/requiredTest.js",["client"]);
	api.add_files("tests/mocha/client/start-partup/detailsTest.js",["client"]);
	api.add_files("tests/mocha/server/collectionTest.js",["server"]);
	api.add_files("tests/mocha/server/methods/partupMethodsTest.js",["server"]);
	api.add_files("tests/mocha/server/services/partupServiceTest.js",["server"]);
	api.add_files("tests/mocha/server/stubTest.js",["server"]);
});