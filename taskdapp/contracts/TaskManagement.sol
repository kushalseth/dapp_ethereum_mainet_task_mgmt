pragma solidity ^0.4.18;

contract TaskManagement {
    
    struct Date {
        uint16 year;
        uint8 month;
        uint8 date;
    }
    
    struct TaskManagement {
        Date startDate;
        string task;
        string status;
        string assignedTo;
    }
    
    mapping(uint => TaskManagement) private tasks;
    uint[] private taskIds;
    
    event LogNewAddedTask(uint id, string task, string status, string assignedTo, uint16 year, uint8 month, uint8 date);
    
    
    function addTask(uint id, string task, string status, string 
                     assignedTo, uint16 year, uint8 month, uint8 date)  public
                     returns (bool isSuccessful) 
                     {
                        Date storage  _startDate;
                        _startDate.year = year;   
                        _startDate.month = month;
                        _startDate.date = date;
                         
                        tasks[id] = TaskManagement({
                            startDate: _startDate,
                            task: task,
                            status: status,
                            assignedTo: assignedTo
                            
                        });
                        taskIds.push(id);
                        emit LogNewAddedTask(id, task, status, assignedTo, year, month, date);
                        
                        return true;
                     }
                   
    //TODO: Will update and will return TaskManagement object                
    function getTaskById(uint id) public view returns(uint16 year, uint8 month, uint8 date, 
                                         string task, string status, string assignedTo)
    {
        TaskManagement storage _taskmgmt = tasks[id];
        
        
        return (_taskmgmt.startDate.year,  _taskmgmt.startDate.month, _taskmgmt.startDate.date,
                _taskmgmt.task, _taskmgmt.status, _taskmgmt.assignedTo);
    }
    
    function getTotalTasksCount() public view returns (uint length) {
        return taskIds.length;
    }
    
    function getTaskIdByIndex(uint index) public view returns (uint taskId) {
        return taskIds[index];
    }
    
}