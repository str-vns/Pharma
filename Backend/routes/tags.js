const express  = require("express")
const router =  express.Router()
const tagsController = require("../controllers/tagsController")
const { METHOD, PATH, ROLE } = require("../constants/index")

const tagsRoutes = [
    {
        method: METHOD.POST,
        path: PATH.TAGS,
        roles: [],
        middleware: [],
        handler: tagsController.addTags
    },
    {
        method: METHOD.GET,
        path: PATH.TAGS,
        roles: [],
        middleware: [],
        handler: tagsController.GetAllTags
    },
    {
        method: METHOD.PATCH,
        path: PATH.TAGS_EDIT_ID,
        roles: [],
        middleware: [],
        handler: tagsController.UpdateTags
    },
    {
        method: METHOD.DELETE,
        path: PATH.TAGS_ID,
        roles: [],
        middleware: [],
        handler: tagsController.DeleteTags
    },
    {
        method: METHOD.PATCH,
        path: PATH.TAGS_ID,
        roles: [],
        middleware: [],
        handler: tagsController.SofttDeleteTags
    },
    {
        method: METHOD.PATCH,
        path: PATH.RESTORE_TAGS_ID,
        roles: [],
        middleware: [],
        handler: tagsController.RestoreTags
    },
   

]

tagsRoutes.forEach((route) =>
{
  const {method, path, roles = [], middleware = [], handler} = route
  router[method](path, handler)
})

module.exports = router