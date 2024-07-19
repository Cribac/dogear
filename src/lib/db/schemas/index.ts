import { Users } from './profile'
import { Profile } from './profile'
import { Bookmark, bookmarksRelations } from './bookmark'
import { Category, categoriesRelations } from './category'

export { Users } from './profile'
export { Profile } from './profile'
export { Bookmark, bookmarksRelations } from './bookmark'
export { Category, categoriesRelations } from './category'

const schema = {
  Users,
  Profile,
  Bookmark,
  bookmarksRelations,
  Category,
  categoriesRelations
}

export default schema
