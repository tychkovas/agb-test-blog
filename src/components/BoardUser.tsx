import React from "react";

import { getCurrentUser } from "../services/auth.service";
import { getUserBoard } from "../services/user.service";

const BoardUser: React.FC = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Content user: '{currentUser.username}'</h3>
      </header>
      <p>{getUserBoard()}</p>
    </div>
  );
};

export default BoardUser;
