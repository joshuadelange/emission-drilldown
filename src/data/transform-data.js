import data from './data.json';

export function transformData() {    
    return transformScopes(data);
}

function transformScopes(scopes) {
    return Object.keys(scopes).reduce((transformedData, scope) => {

        const activitiesByCategory = transformCategories(data[scope]);

        const sum = activitiesByCategory.reduce((sum, category) => {
            return sum + category.sum;
        }, 0);

        transformedData.push({
            name: scope,
            sum,
            activitiesByCategory
        })

        return transformedData;

    }, []);
}

function transformCategories(categories) {
    return Object.keys(categories).reduce((transformedCategories, category) => {
        
        const activities = transformActivities(categories[category]);

        const sum = activities.reduce((sum, activity) => {
            return sum + activity.amount;
        }, 0);

        transformedCategories.push({
            name: category,
            sum,
            activities
        })

        return transformedCategories;

    }, []);
}

function transformActivities(activities) {
    return activities.map(activity => {
        return {
            name: activity[0],
            amount: activity[1],
            metric: activity[2]
        }
    })
}