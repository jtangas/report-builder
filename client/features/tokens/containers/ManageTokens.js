import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import CreateToken from 'features/tokens/components/Form/CreateToken';
import TokenList from 'features/tokens/components/Tokens/List';
import NotFound from 'features/app/containers/NotFound';

export default withRouter(props => {
  const {
    match,
  } = props;

  const { tokenId, action } = match.params;

  const handleUpdateSubmit = values => {
    console.log({
      method: 'update',
      values,
    });
  };

  const handleSubmit = values => {
    console.log({
      method: 'create',
      values,
    });
  };

  if (tokenId !== null && tokenId !== false && action === 'edit' ) {
    return (
      <CreateToken
        tokenId={tokenId}
        handleSubmit={handleUpdateSubmit}
      />
    )
  }

  if (action === 'create') {
    return (
      <CreateToken
        handleSubmit={handleSubmit}
      />
    );
  }

  if (action === false && tokenId === false) {
    return (
      <Container>
        <TokenList />
      </Container>
    );
  }

  return (
    <NotFound/>
  )
});
