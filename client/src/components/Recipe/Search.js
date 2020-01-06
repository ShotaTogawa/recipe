import React from "react";
import { ApolloConsumer } from "react-apollo";
import { SEARCH_RECIPES } from "../../queries";
import SearchItem from "./SearchItem";

class Search extends React.Component {
  state = {
    searchResults: []
  };
  handleChange = ({ searchRecipes }) => {
    this.setState({ searchResults: searchRecipes });
  };
  render() {
    return (
      <ApolloConsumer query={SEARCH_RECIPES} variables={{ searchTerm: "" }}>
        {client => (
          <div className="App">
            <input
              type="search"
              placeholder="search for recipes"
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value }
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {this.state.searchResults.map(recipe => (
                <SearchItem key={recipe._id} {...recipe} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
