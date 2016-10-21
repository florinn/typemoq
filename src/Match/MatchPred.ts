namespace TypeMoqIntern.Match {

    export class MatchPred<T> implements IMatch {

        readonly ___id = Consts.IMATCH_ID_VALUE;

        constructor(private _pred: IFunc2<T, boolean>) {
        }

        ___matches(object: Object): boolean {
            let match = false;
            if (this._pred(<T>object))
                match = true;
            return match;
        }
    }

}