import { Component } from "react";

type Props = {};

type State = {
  content: string;
}

const textContent = 'Test project for apollo, graphQL and bull. React is also used.';

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: textContent
    };
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          Home page Blog
        </header>
        <p>
          {this.state.content}
        </p>
          
      </div>
    );
  }
}

