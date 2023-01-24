# wp-employees-customblock

A Gutenberg Custom Block displaying information for employees in a different countries.  This was a project for the new [ProVeg]( https://proveg.com/) website. 

The data and images for this block are inputed in a custom post named **Employees**. This data then shows up in Gutenburg when the Employees Block is selected.

![Demo](assets/employee-demo.gif)

## Prerequisites

### Custom Post

The custom block requires a Custom Post named *Employees*
```
function employees() {
  register_post_type('employee', array (
  'show_in_rest' => true,
  'supports' => array('title', 'excerpt', 'thumbnail', 'editor'),
 'public' => true,
  'show_in_rest' => true,
 'show_ui' => true,
  'labels' => array(
    'name' => 'Employees',
   'add_new_item' => 'Add New Employee',
    'edit_item' => 'Edit Employee',
   'all_items' => 'All Employees',
    'singular_name' => 'Employee',
     'view_item' => 'View Employee'
  ),
 'taxonomies' => array( 'category', 'post_tag' ),
  'menu_icon' => 'dashicons-id'
 ));

}

+add_action('init', 'employees');

```

### Advanced Custom Fields (ACF) including repeater field types.  

The custom block is set up to work with the following Field Group:

| Field Group: Employees |                |              |             |
|------------------------|----------------|--------------|-------------|
| Field Label: Employee  | Type: Repeater |              |             |
|                        | Subfields:     | Label: Image | Type: Image |
|                        |                | Label: Name  | Type: Text  |
|                        |                | Label: Job Title  | Type: Text  |
|                        |                | Label: City  | Type: Text  |

## Installation
```
npm install --production
```
## App Info
### Author
Andrew Stratton
### Version
1.0
