/* eslint-disable no-unused-vars */
const data = require('./term2.json');
const { log } = require('console');
const Categories = require('../db/models/Categories');
const Trees = require('../db/models/Trees');
const Lessons = require('../db/models/Lessons');
const Questions = require('../db/models/Questions');


(async () => {
//   // const raw = {
//   //   learningType: 'المرحلة المتوسطة',
//   //   level: 'الصف  الثالث المتوسط',
//   //   term: 'الفصل الدراسي الأول',
//   //   subject: 'المهارات الرقمية'
//   // }
//   // const data = await Lessons
//   //   .find(raw)
//   //   .populate({
//   //     path: 'Trees.treeId',
//   //     populate: {
//   //       strictPopulate: false,
//   //       path: 'Questions',
//   //       populate: {
//   //         path: 'QuestionId',
//   //       }
//   //     }
//   //   })
//     // .exec()
//     // .aggregate([
//     //   { $match: raw },
//     //   {
//     //     $lookup: {
//     //       from: 'Trees',
//     //       localField: 'Trees.treeId',
//     //       foreignField: 'treeId',
//     //       as: 'Trees.populatedTree',
//     //     },
//     //   },
//     // ]);
//   // {
//   //   $lookup: {
//   //     from: 'referencemodels',
//   //     localField: 'referenceField2.treeId',
//   //     foreignField: 'treeId',
//   //     as: 'referenceField2.populatedTree',
//   //   },
//   // },

//   // populate({
//   // path: 'Trees.treeId'
//   // })

//   // console.log(data);
//   // console.log(data.length);
//   // console.log(data?.[0]?.Trees[0].treeId.Questions);
// })();

// (async () => {
//   try {
//     // const categeories = Array.from(new Set(data.map(obj => {
//     //   obj.children = obj.children ? obj.children.concat([obj]) : [obj]
//     //   return obj.categeory
//     // })));
//     // .map(category => {
//     //   const firstObject = data.find(obj => obj.categeory === category);
//     //   return {
//     //     category,
//     //     categoryId: firstObject.categeoryId,
//     //     categoryCode: firstObject.categeoryCode,
//     //   };
//     // });
    
//     // console.log(categeories[0].children.length);


    

//     // await filterByCategory(data);
//   } catch (err) {
//     log(err.message)
//   }

  // const d = await filterByExistsData(data);
  // log(d)


  // const categeories = await Categories.find();

  // for(let categeory of categeories) {
  //   console.log(await pushAvaiableTermToCategory(categeory._id, {
  //     "term": "الفصل الدراسي الأول",
  //     "termCode": "SM1",
  //   }))
  // }

  //   // العليم العام
  // console.log(await pushAvaiableTermToCategory('64e29933c99afd3dfa994f77', {
  //   "term": "الفصل الدراسي الثاني",
  //   "termCode": "SM2",
  // }))
  
  // الطفولة المبكرة
  // console.log(await pushAvaiableTermToCategory('64e29947c99afd3dfa9a0134', {
  //   "term": "الفصل الدراسي الثاني",
  //   "termCode": "SM2",
  // }))

  // const trees = await Trees.find()
  // .populate({
  //   path: 'Lesson'
  // })
  // .populate({
  //   path: 'Questions.QuestionId'
  // });

  // await moveDataToTrees(trees);
  // await setCategoriesToTrees(trees);
  // await filterByExistsData(data);

  // console.log(await Categories.find({'availableTermData.termCode': 'SM2'}, {category: 1}))
  // console.log(await Categories.findOneAndUpdate({'availableTermData.termCode': 'dassds'}, {
  //   "availableTermData.$.termCode": 'SM2'
  // }))
})();

async function pushAvaiableTermToCategory(_id, data) {
  const categeory = await Categories.findByIdAndUpdate(_id, {
      $push: {
        availableTermData: data
      }
  });
  
  return categeory;
}

async function filterByExistsData(data) {
  const categories = {}

    for(let lessonData of data) {
      const payload = {
        // there was a spelling mass in here that's way compare between (categ{e}ory, category)
        category: lessonData.categeory || lessonData.category,
        categoryId: lessonData.categeoryId || lessonData.categoryId,
        categoryCode: lessonData.categeoryCode ||  lessonData.categoryCode,
      };

      // if the spelling mass exists remove it to leave only lesson Data
      delete lessonData.categeory;
      delete lessonData.categeoryId;
      delete lessonData.categeoryCode;

      const categoryName = payload.category;
      // check if the cateory already exists or not to get only unique categories without any repetition
      if(!categories[categoryName]) {
        // define the first lesson as children
        categories[categoryName] = {...payload, children: [lessonData]};
      } else {
        // push the children related to that category
        categories[categoryName] = {...categories[categoryName], children: categories[categoryName].children.concat([lessonData])};
      }
    }

    const categoriesArr = Object.keys(categories);

    for(const categoryName of categoriesArr) {
      const category = categories[categoryName];

      // access the lessons related to that category then remove them while check for category existence and creating a new one
      const childrens = category.children;
      delete category.children;
      
      // checkers
      let categeoryNotExists = false;

      // check if category exists and if not create a new one
      let categoryDocument = await Categories.findOne(category);
      if(!categoryDocument) {
        categoryDocument = new Categories(category);
        categeoryNotExists = true;
      }

      for(let a = 0; a < childrens.length; a++) {
        const child = childrens[a]; // child = lessonData
        // access trees of lesson and delete them from lesson object to prepare it for save 
        const trees = child.trees;
        delete child.trees;

        const lessonDocument = new Lessons(child);

        for(let i = 0; i < trees.length; i++) {
          // access and creating the trees of lesson
          const tree = trees[i];
          const treeDocument = new Trees(tree);

          // linking the tree with it's Lesson, Category
          treeDocument.Lesson = lessonDocument._id;
          treeDocument.Category = categoryDocument._id;

          // linking trees with their lesson
          // check if {Trees} array alreay defined or not and if not define it as array and push the first tree it then push the next in the array
          lessonDocument.Trees = lessonDocument.Trees 
            ? lessonDocument.Trees.concat([{ treeId: treeDocument._id }]) 
            : [{ treeId: treeDocument._id }];

          await treeDocument.save();
        }

        // a percentage counter for the operation
        console.log('====================================');
        console.log(
          `finished ${(Math.floor(Math.round(((a+1) / childrens.length) * 100)))}% of lessons`, 
          new Date().toLocaleString()
        );
        console.log('====================================');

        // linking lesson with their category
        lessonDocument.Category = categoryDocument._id;
        
        // linking category with it's own lessons
        if(categeoryNotExists) {
          categoryDocument.Lessons = categoryDocument.Lessons 
            ? categoryDocument.Lessons.concat([{ LessonId: lessonDocument._id }]) 
            : [{ LessonId: lessonDocument._id }];
        }

        await lessonDocument.save();
      }

      if(categeoryNotExists) {
        await categoryDocument.save();
      }

    }
}

async function setCategoriesToTrees(trees) {
  for(let i = 0; i <  trees.length; i++) {
    const tree = trees[i];
    const updateTree = await Trees.findByIdAndUpdate(tree._id, {
      Category: tree.Lesson.Category,
    });

    console.log(Math.floor(Math.round((i / trees.length) * 100)))
  }

  console.log('done !!!!!!!!!!!');
}

async function moveDataToTrees(trees) {

  for(let tree of trees) {
    const questions = tree.Questions;
    const LessonVocabularies = Array.from(new Set(tree.Questions.map(e => {
      const vocab = e.QuestionId.LessonVocabulary;

      if(vocab) {
        Questions.findByIdAndUpdate(e.QuestionId._id, {
          $unset: {
            LessonVocabulary: 1,
          }
        })
        .then(console.log);
      }

      return vocab
    })));
    const LessonPreparation = Array.from(new Set(tree.Questions.map(e => {
      const prep = e.QuestionId.LessonPrepare;

      if(prep) {
        Questions.findByIdAndUpdate(e.QuestionId._id, {
          $unset: {
            LessonPrepare: 1,
          }
        })
        .then(console.log);
      }

      return prep;
    })));

    const updates = {}

    // console.log(LessonVocabularies.length);
    if(LessonVocabularies.length > 0) {
      updates.LessonVocabulary = LessonVocabularies.toString()
    }

    if(LessonPreparation.length > 0) {
      updates.LessonPrepare = LessonPreparation.toString()
    }

    if(LessonVocabularies.length > 0 || LessonPreparation.length > 0) {
      const updateTree = await Trees.findByIdAndUpdate(tree._id, updates);
      console.log(updateTree)
    }
  }

  console.log('moveDataToTrees', 'done !!!!!!!!!!!');
}

async function filterByCategory(data) {
  const categories = {}

    for(let _objects of data) {
      const payload = {
        category: _objects.categeory || _objects.category,
        categoryId: _objects.categeoryId || _objects.categoryId,
        categoryCode: _objects.categeoryCode ||  _objects.categoryCode,
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

