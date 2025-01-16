import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: TaskModel[] = [];
  filteredTasks: TaskModel[] = [];
  priorityFilter = '';
  statusFilter = '';

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  openTaskForm(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      panelClass: 'task-dialog'
    });
  
    // After the dialog is closed, handle the returned task data
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Add the new task to the tasks array
        this.tasks.push(result);
  
        // Reapply the filters to ensure the new task is shown based on the current filters
        this.applyFilters();
      }
    });
  }
  
  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(
      (task) =>
        (!this.priorityFilter || task.priority === this.priorityFilter) &&
        (!this.statusFilter || task.status === this.statusFilter)
    );
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }
}
