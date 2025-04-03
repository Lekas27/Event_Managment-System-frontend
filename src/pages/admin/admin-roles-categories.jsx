import {useRoles} from "../../hooks/use-roles.js";
import {useCategories} from "../../hooks/use-categories.js";
import {CategoryRoleAdminTable} from "../../components/CategoryRoleAdminTable.jsx";


export const AdminRolesCategories = () => {
    const {roles: roles, isLoading: isRolesLoading} = useRoles([]);
    const {category: categories, isLoading: isCategoriesLoading} = useCategories([]);


    const onRoleEdit = (id) => {};
    const onRoleDelete = (id) => {};

    const onCategoryEdit = (id) => {};
    const onCategoryDelete = (id) => {};

    return (
        <>
            {!isRolesLoading && !isCategoriesLoading && <div className={"w-full flex flex-col lg:flex-row items-center gap-y-5 lg:gap-y-0 lg:gap-x-5"}>
                <CategoryRoleAdminTable type={roles} label={"Role"} onDelete={onRoleDelete} onEdit={onRoleEdit}/>
                <CategoryRoleAdminTable type={categories} label={"Category"} onDelete={onCategoryDelete} onEdit={onCategoryEdit}/>
            </div>
            }
        </>
    )


}