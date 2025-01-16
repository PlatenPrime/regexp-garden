import { makeAutoObservable } from "mobx";

export class Toggle<State> {
  private currentInd = 0;

  get currentState(): State {
    return this.states[this.currentInd];
  }

  toggle(): State {
    const newIndex = (this.currentInd + 1) % this.states.length;
    this.currentInd = newIndex;
    return this.currentState;
  }

  prevState(): State {
    this.currentInd = this.currentInd - 1;
    if (this.currentInd === -1) {
      this.currentInd = this.states.length - 1;
    }
    return this.currentState;
  }

  nextState(): State {
    return this.toggle();
  }

  setState(newState: State): State {
    const newIndex = this.states.indexOf(newState);
    if (newIndex !== -1) {
      this.currentInd = newIndex;
    }
    return this.currentState;
  }

  constructor(private states: State[]) {
    makeAutoObservable(this);
  }
}
