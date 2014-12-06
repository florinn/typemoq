/// <reference path='_all.ts' />

module TypeMoq {

    export class Mock<T> implements IMock<T> {

        constructor(c?: { new (): T; prototype }) {

        }

    }

}