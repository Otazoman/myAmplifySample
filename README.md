# myAmplify_sample

## description

This is Amplify's todo list app with authentication.  
refer:  
<https://qiita.com/minamoto-shunsuke/items/633e5bdd32856e5cc7f4?fbclid=IwAR1PQ3npmnZB1h8q9kr_2-AIEYBOLwOn2Vk7Zc69HYdTEgRYQxDH7PBThZc>

## environment

Frontend React  
Basckend Amplify  
Database DynamoDB

## usage

```
$ git clone https://github.com/Otazoman/myAmplifySample.git

$ npm install -g @aws-amplify/cli
$ cd myAmplifySample

$ npm install aws-amplify @aws-amplify/ui-react
$ npm install @mui/x-date-pickers
$ npm install dayjs
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/styled-engine-sc styled-components

$ amplify configure
$ amplify init
$ amplify add auth
$ amplify add api

$ amplify push
```

## schema.graphql edit required

```
# This "input" configures a global authorization rule to enable public access to
# all models in this schema. Learn more about authorization rules here: https://docs.amplify.aws/cli/graphql/authorization-rules
input AMPLIFY {
  globalAuthRule: AuthRule = { allow: public }
} # FOR TESTING ONLY!
type Todo @model {
  id: ID!
  title: String!
  status: String
  priority: String
  start: AWSDate
  end: AWSDate
  description: String
  user: String!
}
```

## 
