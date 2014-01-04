///<reference path='../vendor/dt-node/node.d.ts'/>
///<reference path='../vendor/dt-mocha/mocha.d.ts'/>
///<reference path='../vendor/dt-sinon/sinon.d.ts'/>
///<reference path='../vendor/dt-sinon-chai/sinon-chai.d.ts'/>
var chai: SinonChaiStatic = require('chai');
import sinon = require('sinon');
chai.use(require('sinon-chai'));
export var expect = chai.expect;
