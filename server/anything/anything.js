const data = require('./all.json');
const { log } = require('console');
const Categories = require('../db/models/Categories');
const Trees = require('../db/models/Trees');
const Lessons = require('../db/models/Lessons');


(async () => {
  try {
    
    // const categeories = Array.from(new Set(data.map(obj => {
    //   obj.children = obj.children ? obj.children.concat([obj]) : [obj]
    //   return obj.categeory
    // })));
    // .map(category => {
    //   const firstObject = data.find(obj => obj.categeory === category);
    //   return {
    //     category,
    //     categoryId: firstObject.categeoryId,
    //     categoryCode: firstObject.categeoryCode,
    //   };
    // });
    
    // console.log(categeories[0].children.length);


    

    await filterByCategory(data);
  } catch (err) {
    log(err.message)
  }
})();


async function filterByCategory(data) {
  const categories = {}

    for(let _objects of data) {
      const payload = {
        category: _objects.categeory,
        categoryId: _objects.categeoryId,
        categoryCode: _objects.categeoryCode,
      };

      delete _objects.categeory;
      delete _objects.categeoryId;
      delete _objects.categeoryCode;

      if(!categories[payload.category]) {
        categories[payload.category] = {...payload, children: [_objects]};
      } else {
        categories[payload.category] = {...categories[payload.category], children: categories[payload.category].children.concat([_objects])};
      }
    }

    // console.log(Object.keys(obj).length, obj[Object.keys(obj)[0]].children[0]);
    const categoriesArr = Object.keys(categories);

    for(const categoryName of categoriesArr) {
      const category = categories[categoryName];

      const childrens = category.children;

      delete category.children;

      log(category);
      
      const _category = new Categories(category)

      for(const child of childrens) {
        const trees = child.trees;
        delete child.trees;
        const _lesson = new Lessons(child);

        for(const tree of trees) {
          const _tree = new Trees(tree);
          _tree.Lesson = _lesson._id;
          _lesson.Trees = _lesson.Trees ? _lesson.Trees.concat([{ treeId: _tree._id }]) : [{ treeId: _tree._id }];
          await _tree.save();
        }

        _lesson.Category = _category._id;

        _category.Lessons = _category.Lessons ? _category.Lessons.concat([{ LessonId: _lesson._id }]) : [{ LessonId: _lesson._id }];

        await _lesson.save();
      }

      await _category.save();

      console.log(categoryName);
    }
}

async function isolateTrees(data) {
    for(let i =0; i < data.length; i++) {
      let d = data[i];
      const trees = d.trees;
      delete d.trees;
      const newLesson = new Lessons(d);
        // handling getting the trees id
        if (trees) {
          const treesHolder = []
          for (let tr of trees) {
            tr.Lesson = newLesson._id;
            const tree = new Trees(tr);
            await tree.save();
            log(tree._id, i);
            treesHolder.push({treeId: tree._id})
          }
          newLesson.trees = treesHolder;
        }
        
        await newLesson.save()
        // log(s)
    }
}


// console.log('====================================');
// console.log(data);
// console.log('====================================');

// (async () => {
//   try {
//     for(let i =0; i < data.length; i++) {
//       let d = data[i];
//       const trees = d.trees;
//       delete d.trees;
//       const newLesson = new Lessons(d);
//         // handling getting the trees id
//         if (trees) {
//           const treesHolder = []
//           for (let tr of trees) {
//             tr.Lesson = newLesson._id;
//             const tree = new Trees(tr);
//             await tree.save();
//             log(tree._id, i);
//             treesHolder.push({treeId: tree._id})
//           }
//           newLesson.trees = treesHolder;
//         }
        
//         await newLesson.save()
//         // log(s)
//     }
//   } catch (err) {
//     log(err.message)
//   }
// })();

// Lessons.findOne({ 
//   $expr: { 
//     $gt: [{ $size: "$trees" }, 1] 
//   } 
// })
// .skip(5)
// .limit(10)
// .then(async (result) => {
//   await result.populate({
//     // path: 'trees',
//     // populate: { path: '_id' },
//     path: 'trees',
//     populate: { path: 'treeId' },
//   });
  
//   await result.trees[0].treeId.populate({
//     path: 'Lesson'
//   });
  
//   console.log('====================================');
//   // console.log(result.trees[0]);
//   console.log(result.trees[0])
//   console.log('====================================');
// }).catch((err) => {

// });

// Lessons.aggregate([
//   {
//     $match: {
//       $expr: { $gt: [{ $size: "$trees" }, 1] }
//     }
//   },
//   {
//     $lookup: {
//       from: "Trees",
//       localField: "trees._id",
//       foreignField: "_id",
//       as: "treesData"
//     }
//   },
//   { $skip: 5 },
//   { $limit: 10 }
// ])
// .then((result) => {
//     console.log('====================================');
//     console.log(result);
//     console.log('====================================');
//   })
  
// console.log(17441741);

// console.log('====================================');
// console.log(Lessons);
// console.log('====================================');


// Images.find()
//   .then(async files => {
//     // let arr = new Uint8Array(file.buffer.data)
//     // const f = new File([arr], file.originalname, { type: file['mimetype'] });
//     //+`.${file['mimetype'].split('/').at(-1)}`
//     // files.forEach(async file => {
//     //   fs.writeFile(path.join(__dirname, `../lessons-uploads/images/${Date.now()}--${file.originalname}`), file.buffer, function (err) {
//     //     console.log(err);
//     //   })
//     // })
//   });

