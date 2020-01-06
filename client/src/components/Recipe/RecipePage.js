import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_RECIPE } from "../../queries";

const RecipePage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        console.log(data);
        return (
          <div className="App">
            <h2>{data.getRecipe.name}</h2>
            <p>Categoriy: {data.getRecipe.category}</p>
            <p>Description: {data.getRecipe.description}</p>
            <p>Instrucutons: {data.getRecipe.instruction}</p>
            <p>Likes: {data.getRecipe.likes}</p>
            <p>Created By: {data.getRecipe.username}</p>
            <button>Like</button>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);