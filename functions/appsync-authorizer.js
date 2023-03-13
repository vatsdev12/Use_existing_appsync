exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  const response = {
    isAuthorized: true,
    resolverContext: {
      // Add any additional context information here
      user: "john.doe@example.com",
    },
  };
  console.log(JSON.stringify(response));
  return response;
};