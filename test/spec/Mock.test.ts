/// <reference path='../setup.ts' /> 

import Mock = TypeMoq.Mock;

module TypeMoq.Tests {

    describe('Mock', () => {

        describe('ctor', () => {

            it('should create an instance using interface as type variable', () => {

                var mock = new Mock<IBar>();

                expect(mock).to.be.not.null;
            });

            it('should create an instance using interface as type variable and class as ctor parameter', () => {

                var mock = new Mock<IBar>(Bar);

                expect(mock).to.be.not.null;
            });

            it('should create an instance using class as type variable', () => {

                var mock = new Mock<Bar>();

                expect(mock).to.be.not.null;
            });

            it('should create an instance using class as type variable and class as ctor parameter', () => {

                var mock = new Mock<Bar>(Bar);

                expect(mock).to.be.not.null;
            });

            it('should create an instance using class as ctor parameter', () => {

                var mock = new Mock(Bar);

                expect(mock).to.be.not.null;
            });

        });

        describe('.object', () => {

            //var mock = new Mock(Bar);
            //IBar bar = mock.Object;
            it('should initialize proxy instance');

            //var mock = new Mock<IBar>();
            //IBar bar = mock.Object;
            it('should expose interface passed in as type variable to ctor');

        });

        describe('.setup', () => {

            var mock: Mock<Bar>;

            beforeEach(() => {
                mock = new Mock(Bar);
            });

            //mock.setup(obj  => obj.method()).returns(value/function)
            it('should match a paramless method');

            //mock.setup(obj  => obj.method(It.IsAny<string>())).returns(value/ (s:string) => s.toLower())
            it('should match a method with params');

            //mock.setup(obj  => obj.property).returns(value / function)
            it('should match a property');

            //mock.setup(obj  => obj.method()).returns(value/function)
            it('should attach a value an return it when the method gets called');

            //mock.setup(obj  => obj.method()).returns(value/function)
            it('should attach a callback and execute it when the method gets called');

        });

        describe('.verify', () => {

            var mock: Mock<Bar>;

            beforeEach(() => {
                mock = new Mock(Bar);
            });

            //mock.verify(obj => obj.method("ping"), Times.AtLeastOnce())
            it('should check that method with params was called at least once');

        });

        describe('with chai,should.js,expect.js,better-assert expectations', () => {

            var mock: Mock<Bar>;

            beforeEach(() => {
                mock = new Mock(Bar);
            });

            //expect(mock(obj => obj.method("ping"))).to.have.been.called.atLeastOnce
            it('should check that method with params was called at least once');

        });

        it('should support autosandboxing for global objects (maybe through a param for Mock or a separate class GlobalMock)');
    });

}