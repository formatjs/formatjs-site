/*global describe, it*/
var pkgMeta = require('../lib/package-meta');
var expect = require('chai').expect;

describe('Package Meta', function () {
    it('returns the meta information for installed packages', function () {
        expect(pkgMeta('dust-intl'))
            .to.have.keys([
                'name',
                'version',
                'description',
                'dist'
            ])
            .and.to.have.property('dist')
                .that.is.an('object')
                .with.keys(['main', 'withLocales', 'localeData']);
    });
});
