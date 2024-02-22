/* eslint-disable no-unused-vars */
const data = require('./term3.json');
const { log } = require('console');
const Categories = require('../db/models/Categories');
const Trees = require('../db/models/Trees');
const Lessons = require('../db/models/Lessons');
const Questions = require('../db/models/Questions');
const Semesters = require('../db/models/Semesters');
const { default: mongoose } = require('mongoose');
const BooksAndActivities = require('../db/models/BooksAndActivities');
const crypto = require("crypto");

console.log(crypto.pseudoRandomBytes(32).toString("base64"));


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

  // await filterByExistsAndAddTermsToCategories(data.data, data.books);
  // await saveBooksToTrees(data.books)
  // const d = await filterByExistsData(data.data);
  // log(d)

  // console.log(filterByExistsAndAddTermsToCategories(data.data));

  
    // Categories.findByIdAndUpdate(categeory._id, {
    //   $unset: {
    //     availableTermData: 1,
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
    // .catch(Err => console.error(Err))


  // const categeories = await Categories.find();

  // for(let categeory of categeories) {
  //   console.log(await pushAvaiableTermToCategory(categeory._id, {
  //     "term": "الفصل الدراسي الأول",
  //     "termCode": "SM1",
  //   }))
  // }

    // العليم العام
  // console.log(await pushAvaiableTermToCategory('64e29933c99afd3dfa994f77', {
  //   "term": "الفصل الدراسي الثاني",
  //   "termCode": "SM2",
  // }))
  
  // // الطفولة المبكرة
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

  // for(let item of data) {
  //   await updateMissingLevel2(item, true)
  // }

  // const levels = [
  //   {termCode: "SM2", level: "الصف الأول الابتدائي", subject: "WE CAN"},
  //   {termCode: "SM2", level: "الصف الأول الابتدائي", subject: "WE CAN"},
  //   {termCode: "SM2", level: "الصف الأول الابتدائي", subject: "WE CAN"},
  // ]
  // Lessons.find({termCode: "SM2"})

  // await deleteQuestions({
  //   collection: Lessons,
  //   populate: "Trees.treeId",
  //   populatedItem: "Trees",
  //   action: async (tree) => await deleteAllQuestions(tree),
  //   query: {
  //     "termCode": "SM2",
  //     level: {
  //       $in: [
  //         "الصف الأول الابتدائي",
  //         "الصف الثاني الابتدائي",
  //         "الصف  الثالث الابتدائي",
  //         "الصف الرابع الابتدائي",
  //         "الصف  الخامس الابتدائي",
  //         "الصف السادس الابتدائي"
  //       ],
  //     },
  //     subject: {
  //       "$regex": /we can/i
  //     }
  //   },
  // });

  // const dataToDelete = await Lessons.find({
  //   "termCode": "SM2",
  //   "level": {
  //     "$in": [
  //       "الصف  الثالث المتوسط",
  //       // "الصف الثاني الابتدائي",
  //       // "الصف  الثالث الابتدائي",
  //       // "الصف الرابع الابتدائي",
  //       // "الصف  الخامس الابتدائي",
  //       // "الصف السادس الابتدائي"
  //     ]
  //   },
  //   "subject": {
  //     "$regex": /رياضيات/i
  //   }
  // }).populate("Trees.treeId");

  // dataToDelete.forEach(async (d, i) => {
  //   const trees = d.Trees;
  //   for(const tr of trees) {
  //     const tree = tr.treeId;
  //     if(tree.Questions?.length) {
  //       console.log(await deleteAllQuestions(tree));
  //       console.log('====================================');
  //       console.log(tree);
  //       console.log('====================================');
  //     } else {
  //       console.log('no questions')
  //     }
  //   }
    
  //   // percentage counter
  //   console.log(Math.floor(Math.round((i / (dataToDelete.length - 1)) * 100)))
  // })

  // const testTree = await Trees.findById('6552b5100d0d84ee9a810225');
  // console.log(await deleteAllQuestions(testTree));
  // 65602fd2b593d8b8d461c17e, 656031f3b593d8b8d461c18d
})();

/**
 * ==============================================================================================
 * use the following function when adding a new data as it's the latest functions to handle data 
 * checkout from line 218 - 375 => the main function is the next one the start point
 * ===============================================================================================
 */
async function filterByExistsAndAddTermsToCategories(data, books) {
  await moveSemestersFromCategoryToSemestersCollection();
  const {categories, semesters} = sortDataByCategoriesAndTerm(data);
  await filterByExistsData(data);
  if(books) await saveBooksToTrees(books)
  return {categories, semesters}
}

// for one time use function to update some data in DB
async function moveSemestersFromCategoryToSemestersCollection(data) {
  // wait untill db connection is done
  mongoose.connection.once('open', async function() {
    const semestersMap = {};
    data = await mongoose.connection.collections.categories.find({}, { availableTermData: 1 }).toArray();
    // filtering data
    data.forEach(category => category.availableTermData.forEach(term => {
      if(!term.termCode) return;
      delete term._id;
      delete term.termId;
      if(!semestersMap[term.termCode]) {
        semestersMap[term.termCode] = {...term, categories: [category._id.toString()]};
      } else {
        semestersMap[term.termCode] = {...term, categories: semestersMap[term.termCode].categories.concat([category._id.toString()])};
      }
    }));
  
    const semesters = Object.values(semestersMap);

    if(semesters.length) {
      // create semesters
      const semestersSavedData = await Semesters.create(semesters);
      console.log('.............. move semesters done ...............');
  
      // fist make any {availableTermData} empty
      await Categories.updateMany({}, {availableTermData: []});
      
      // assign termId to category data
      for(const term of semestersSavedData) {
        for(const categoryId of term.categories) {
          await pushAvaiableTermToCategory(categoryId.toString(), term._id.toString());
        }
      }
  
      console.log('.............. update categories semesters done ...............');
    } else {
      console.log('semesters not found in categories collection you may find them exists now in semesters category .................')
    }
  });
}


async function saveBooksToTrees(books) {
  books = Object.values(books);

  for(let i = 0; i < books.length; i++) {
    const book = books[i];
    const data = new BooksAndActivities({
      book: book.pdf,
      title: book.title,
      isActive: book.isActive,
      fullPath: book.completeTitle.split('-').map(e => e.trim()),
      activities: book.activities,
    });

    // console.log(book)
    const tree = await Trees.findOneAndUpdate({ id: book.id }, { book: data._id.toString() });

    data.tree = tree._id.toString(); 
    await data.save();

    
    console.log('====================================');
    console.log(
      `finished ${(Math.floor(Math.round(((i+1) / books.length) * 100)))}% of books`, 
      new Date().toLocaleString()
    );
    console.log('====================================');
  }
}



// ================================================ end of latest =====================================================

async function deleteQuestions({collection, query, populate, populatedItem, action}) {
  const dataToDelete = await collection.find(query).populate(populate || "");
  dataToDelete.forEach(async (d, i) => {
    const populatedField = d[populatedItem];
    for(const tr of populatedField) {
      console.log(await action(tr));
    }
    
    // percentage counter
    console.log(Math.floor(Math.round((i / dataToDelete.length) * 100)))
  })
}

async function deleteAllQuestions(tree) {
  const questions = tree.Questions.map(e => e.QuestionId);
  await Questions.deleteMany({_id: { $in: questions } });
  const updatedTree = Trees.findByIdAndUpdate(tree._id, {
    Questions: [],
  });

  return updatedTree;
}

/**
 * adding the term to the category
 * @param {String} _id category id
 * @param {object} data object contains 2 props {"term","termCode"}
 * @returns object (updated category)
 */
async function pushAvaiableTermToCategory(_id, data) {
  const query = {_id};
  if(data.id) query.availableTermData = {$nin: [data]};
  const categeory = await Categories.findOneAndUpdate({ _id }, {
      $push: {
        availableTermData: data
      }
  });

  if(!categeory) {
    console.log('sorry data already exists => {pushAvaiableTermToCategory}');
  }
  
  return categeory;
}

async function updateMissingLevel2(item, removeLevel2) {
  if(item.level2) {
    const query = {
      levelId: item.levelId,
      termCode: item.termCode,
      termId: item.termId,
      unitId: item.unitId,
      subjectId: item.subjectId,
      unitParentId: item.unitParentId
    };

    let _item = await Lessons.findOne(query);

    if(_item) {
      if(removeLevel2) {
        _item = await Lessons.findByIdAndUpdate(_item._id, {
          $unset: {
            level2: 1,
            level2Id: 1,
            level2Code: 1,
          }
        });
      } else {
        _item = await Lessons.findByIdAndUpdate(_item._id, {
          level1: item.level2,
          level1Id: item.level2Id,
          level1Code: item.level2Code,
        }, { 
          new: true 
        });
      }

      console.log('====================================');
      console.log(_item);
      console.log('====================================');
    }
  }
}

function sortDataByCategoriesAndTerm(data) {
  const categories = {}
  const semesters = {};

    for(let lessonData of data) {
      const payload = {
        // there was a spelling mass in here that's way compare between (categ{e}ory, category)
        category: lessonData.categeory || lessonData.category,
        categoryId: lessonData.categeoryId || lessonData.categoryId,
        categoryCode: lessonData.categeoryCode ||  lessonData.categoryCode,
      };

      const termPayload = {
        term: lessonData.term,
        termCode: lessonData.termCode,
        // termId: lessonData.termId, 
      }

      // if the spelling mass exists remove it to leave only lesson Data
      delete lessonData.categeory;
      delete lessonData.categeoryId;
      delete lessonData.categeoryCode;

      const categoryName = payload.category;
      const termName = termPayload.term;
      // check if the cateory already exists or not to get only unique categories without any repetition
      if(!categories[categoryName]) {
        // define the first lesson as children
        categories[categoryName] = {...payload, children: [lessonData]};
      } else {
        // push the children related to that category
        categories[categoryName] = {...categories[categoryName], children: categories[categoryName].children.concat([lessonData])};
      }

      // check if the term already exists or not to get only unique categories without any repetition
      if(!semesters[termName]) {
        // define the first lesson as children
        semesters[termName] = {...termPayload/* , children: [lessonData] */};
      } else {
        // push the children related to that category
        semesters[termName] = {...semesters[termName]/* , children: terms[termName].children.concat([lessonData]) */};
      }
    }

    return {categories, semesters};
}

/**
 * a function to add new data to the target category and if the category isn't exists it's will create it 
 * @param {Array} data scrapped data array of objects 
 */
async function filterByExistsData(data) {
  const {categories, semesters} = sortDataByCategoriesAndTerm(data);

    const categoriesArr = Object.keys(categories);
    const semestersArr = Object.keys(semesters);

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

      if(semestersArr.length) {
        for(const termName of semestersArr) {
          const term = semesters[termName];
          term.categories = [].concat((term.categories || []), [categoryDocument._id.toString()])
          const doc = await Semesters.create(term);
          const category = await Categories.findByIdAndUpdate(categoryDocument._id.toString(), {
            $push: {
              availableTermData: doc._id.toString()
            }
          });
        }
      }
    }

    return categories;
}

/**
 * a function to add new property to the trees called category to define the category related to that tree
 * @param {Array} trees 
 */

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

/**
 * a function to move {LessonVocabulary, LessonPrepare} data to fix the mass of setting them to questions so it's will move them from questions to trees instead
 * @param {Array} trees 
 */
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


/**
 * the default function to insert the scrapped data
 * @param {Array} data 
 */
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


// async function isolateTrees(data) {
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
// }


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

