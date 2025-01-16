import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TaskModel } from '../models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private taskKey = 'tsks';
    constructor(
        private genericService: GenericService
    ) {}

    getTasks(): TaskModel[] {
        let tasks = JSON.parse(this.genericService.getItemFromLocalStorage(this.taskKey) as string);

        if(tasks) {
            return tasks
        } else {
            return [];
        }
    }

    saveTask(task: TaskModel): void {
        let allTasks = this.getTasks();

        const existingTaskIndex = allTasks.findIndex(item => item.id === task.id);

        if(existingTaskIndex !== -1) {
            allTasks[existingTaskIndex] = task
        } else {
            allTasks.push(task)
        }

        this.genericService.isLocalStorageDefined() ? localStorage.setItem(this.taskKey, JSON.stringify(allTasks)) : console.error('Local storage not defined')
    }

    deleteTask(taskId: string): void {
        const tasks = this.getTasks().filter((task) => task.id !== taskId);
        this.genericService.isLocalStorageDefined() ? localStorage.setItem(this.taskKey, JSON.stringify(tasks)) : console.error('Local storage not defined')

      }
}