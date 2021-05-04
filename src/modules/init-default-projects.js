import { manageProjects } from './projects-manager.js';
import { add, sub } from 'date-fns';

let today = new Date();
let thisWeekDay1 = add(today, { days: 1 });
let pastDay1 = sub(today, { days: 5 });
let thisWeekDay2 = add(today, { days: 2 });
let pastDay2 = sub(today, { days: 6 });

const initDefaultProjects = () => {
  manageProjects.createProject(
    'Body health',
    'I need to keep my body healthy!',
  );
  manageProjects
    .getProjects()[0]
    .createTask(
      'Brush my teeth',
      today,
      2,
      'Need to remove all traces of food (and other things) on my teeth.',
      0,
    )
    .setState(0);
  manageProjects
    .getProjects()[0]
    .createTask(
      'Wash my nose',
      thisWeekDay1,
      1,
      'Need to remove all traces of dust and other things on my nose.',
      0,
    );
  manageProjects
    .getProjects()[0]
    .createTask(
      'Take a bath',
      pastDay2,
      1,
      'Need to take a bath to disinfect my full body.',
      0,
    )
    .setState(3);
  manageProjects
    .getProjects()[0]
    .createTask(
      'Clean my feet',
      pastDay1,
      3,
      "Need to remove all traces of dirt, flowers and herbs on my feet'soles.",
      0,
    );

  manageProjects.createProject(
    'Search for food',
    'I need to keep my belly always full!',
  );
  manageProjects
    .getProjects()[1]
    .createTask(
      'Steal cookies',
      thisWeekDay2,
      1,
      'Look in the cupboards and drawers to find cookies.',
      1,
    );
  manageProjects
    .getProjects()[1]
    .createTask(
      'Collect crumbs',
      today,
      3,
      'Watch for crumbs when my masters take their meal.',
      1,
    )
    .setState(1);
  manageProjects
    .getProjects()[1]
    .createTask(
      'Night meal',
      pastDay2,
      2,
      'When my master are sleeping (or out), look for crumbs and food on the kitchen tables.',
      1,
    )
    .setState(0);

  manageProjects.createProject(
    'Lazy days',
    'Because I am a very busy fox plush, I need to rest sometimes!',
  );
  manageProjects
    .getProjects()[2]
    .createTask(
      'Sunbathe',
      pastDay1,
      1,
      'Sunlight is good to kill bacteria and to warm my fabric.',
      2,
    );
  manageProjects
    .getProjects()[2]
    .createTask(
      'Hide in the bed',
      today,
      2,
      'If I am well hidden under the duvet, I can stay and sleep all the day in the bed.',
      2,
    );
  manageProjects
    .getProjects()[2]
    .createTask(
      'Smell scents',
      thisWeekDay1,
      3,
      'Breathe some scents (especially in the toilets) to relax my brain.',
      2,
    )
    .setState(3);
};
export { initDefaultProjects };
