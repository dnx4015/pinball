function Constants (){
}
Constants.lightPosition = vec3();
Constants.cameraPosition = vec3();
Constants.fileDir = 'obj/';
Constants.textureDir = 'textures/';
Constants.skyboxPosition = vec3();
Constants.skyboxFile = Constants.fileDir + 'wallPaddle';
Constants.tablePosition = vec3();
Constants.tableFile = Constants.fileDir + 'table';
Constants.bumpersPositions = [vec3(),
								vec3(),
								vec3()];
Constants.bumperFile = Constants.fileDir + 'bumper';
Constants.kickersPositions = [vec3(),
								vec3()];
Constants.kickersRotationsY = [0, 180];
Constants.kickerFile = Constants.fileDir + 'kicker';
Constants.ballGeneratorPosition = vec3();
Constants.ballGeneratorFile = Constants.fileDir + 
								'wallRightSide';
Constants.wallsPositions = [vec3(),//topLeft
							vec3(),//topRight
							vec3(),//bottomLeft
							vec3(),//bottomRight
							vec3(),//abovePaddleLeft
							vec3(),//abovePaddleRight
							vec3()];//plungerWall
Constants.wallsFiles = ['wallLeftTop',
						'wallLeftTop',
						'wallLeftBottom',
						'wallLeftBottom',
						'wallPaddle',
						'wallPaddle',
						'wallPlunger'];
Constants.wallsRotationsY = [0, 180, 0, 180, 0, 180, 0]; 
Constants.plungerPosition = vec3();
Constants.plungerFile = Constants.fileDir + 'plunger';
Constants.ballsPositions = [vec3()];
Constants.ballFile = Constants.fileDir + 'ball';
Constants.flippersPositions = [vec3(),
								vec3()];
Constants.flippersRotationsY = [0, 180];
