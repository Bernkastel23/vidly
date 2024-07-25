/*

1.service managing the list of genres (http://vidly.com/api/genres) 
{action-animation-comedy-crime-drama-experimental-fantasy-historical-horror-romance-science fiction-thriller-western-musical-war}

2.get-create-update-delete

*/

const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());


