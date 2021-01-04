CREATE SEQUENCE  "ASE_ASE_ID1_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  ORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL;
CREATE SEQUENCE  "CAP_CAP_ID1_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  ORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL;
CREATE SEQUENCE  "TEV_TEV_ID1_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  ORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL;

  CREATE TABLE "ACCIDENTES" 
   (	"ACC_ID" NUMBER(*,0), 
	"ACC_DESCRIPCION" VARCHAR2(200), 
	"ACC_ID_CLIENTE" NUMBER(*,0) NOT NULL ENABLE, 
	"ACC_ID_PRO" NUMBER(*,0) NOT NULL ENABLE, 
	"ACC_ESTADO" NUMBER(*,0) NOT NULL ENABLE
   );

  CREATE TABLE "ASESORIAS" 
   (	"ASE_ID" NUMBER(*,0), 
	"ASE_CANTIDAD" NUMBER(*,0), 
	"ASE_DISP" NUMBER(*,0), 
	"ASE_TIPOP" VARCHAR2(20), 
	"ASE_ID_USUARIO" NUMBER NOT NULL ENABLE, 
	"ASE_ID_PRO" NUMBER NOT NULL ENABLE, 
	"ASE_FECHA" DATE
   ) ;

  CREATE TABLE "CAPACITACIONES" 
   (	"CAP_ID" NUMBER(*,0), 
	"CAP_PARTICIPANTES" VARCHAR2(300), 
	"CAP_MATERIALES" VARCHAR2(200), 
	"CAP_ID_PRO" NUMBER(*,0) NOT NULL ENABLE, 
	"CAP_ID_CLI" NUMBER(*,0) NOT NULL ENABLE, 
	"CAP_FECHA" DATE
   ) ;

  CREATE TABLE "CHAT" 
   (	"CHAT_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"CHAT_ID_CLIENTE" NUMBER(*,0) NOT NULL ENABLE,
	"CHAT_ID_PRO" NUMBER(*,0) NOT NULL ENABLE, 
   "CHAT_ID_ACCIDENTE" NUMBER(*,0) NOT NULL ENABLE,
	"CHAT_MENSAJE" VARCHAR2(500) NOT NULL ENABLE, 
	"CHAT_MENSAJE_DATE" DATE, 
	"CHAT_CABEZERA" VARCHAR2(500) NOT NULL ENABLE, 
	 PRIMARY KEY ("CHAT_ID")
  );
  
    CREATE TABLE "PLANES" 
   (	"PLA_IDPLAN" NUMBER(*,0) NOT NULL ENABLE, 
	"PLA_NROVISITAS" NUMBER(*,0), 
	 CONSTRAINT "PLANES_PK" PRIMARY KEY ("PLA_IDPLAN")
 );

  CREATE TABLE "CLIENTES" 
   (	"CLI_RUT" VARCHAR2(11) NOT NULL ENABLE, 
	"CLI_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"CLI_RAZONSOCIAL" VARCHAR2(100), 
	"CLI_STATUS" VARCHAR2(10), 
	"PLANES_PLA_IDPLAN" NUMBER(*,0) NOT NULL ENABLE , 
	"CLI_ID_PRO" NUMBER(*,0), 
	 CONSTRAINT "CLIENTES_PK" PRIMARY KEY ("CLI_RUT"),
	 CONSTRAINT "CLIENTES_PLANES_FK" FOREIGN KEY ("PLANES_PLA_IDPLAN")
	  REFERENCES "PLANES" ("PLA_IDPLAN") ENABLE
   ) ;

  CREATE TABLE "CONTRATOS" 
   (	"CON_IDCONTRATO" NUMBER(*,0) NOT NULL ENABLE, 
	"CON_FINICIO" DATE, 
	"CON_FTERMINO" DATE, 
	"CON_FMOD" DATE, 
	"PLANES_PLA_IDPLAN" NUMBER(*,0) NOT NULL ENABLE, 
	"CON_ID_USU" NUMBER(*,0) NOT NULL ENABLE, 
	 CONSTRAINT "CONTRATOS_PK" PRIMARY KEY ("CON_IDCONTRATO"), 
	 CONSTRAINT "CONTRATOS_PLANES_FK" FOREIGN KEY ("PLANES_PLA_IDPLAN")
	  REFERENCES "PLANES" ("PLA_IDPLAN") ENABLE
  );

  CREATE TABLE "MEJORAS" 
   (	"MEJ_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"MEJ_ESTADO" VARCHAR2(10), 
	"MEJ_DESCRIPCION" VARCHAR2(60), 
	"MEJ_RESP_CLI" VARCHAR2(200), 
	"MEJ_IDPRO" NUMBER(*,0), 
	"MEJ_IDCLI" NUMBER(*,0), 
	 CONSTRAINT "MEJORAS_PK" PRIMARY KEY ("MEJ_ID")
 );

  CREATE TABLE "PRO" 
   (	"PRO_RUT" VARCHAR2(11) NOT NULL ENABLE, 
	"PRO_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"PRO_NOMBRE" VARCHAR2(50) NOT NULL ENABLE, 
	"PRO_APELLIDO" VARCHAR2(50) NOT NULL ENABLE, 
	"PRO_FINGRESO" DATE NOT NULL ENABLE, 
	"PRO_CLI_ASIGNADO" NUMBER NOT NULL ENABLE, 
	 CONSTRAINT "PRO_PK" PRIMARY KEY ("PRO_RUT")
 );

  CREATE TABLE "REPORTES_CLI" 
   (	"REP_CLI_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"REP_ID_CLI" NUMBER(*,0) NOT NULL ENABLE, 
	"REP_FECHA" DATE, 
	"REP_VISITAS" NUMBER(*,0), 
	"REP_ASESORIAS" NUMBER(*,0), 
	"REP_ACCIDENTES" NUMBER(*,0), 
	"REP_PROFESIONAL" VARCHAR2(50) NOT NULL ENABLE, 
	"REP_CAPACITACIONES" NUMBER(*,0), 
	 PRIMARY KEY ("REP_CLI_ID")
  );

  CREATE TABLE "REPORTES_GLOBAL" 
   (	"REP_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"REP_FECHA" DATE, 
	"REP_VISITAS" NUMBER(*,0), 
	"REP_ASESORIAS" NUMBER(*,0), 
	"REP_ACCIDENTES" NUMBER(*,0), 
	"REP_CAPACITACIONES" NUMBER(*,0), 
	"REP_PROFESIONALES" NUMBER(*,0), 
	"REP_CLIENTES" NUMBER(*,0), 
	 PRIMARY KEY ("REP_ID")
  ) ;

  CREATE TABLE "REPORTES_PRO" 
   (	"REP_PRO_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"REP_ID_PRO" NUMBER(*,0) NOT NULL ENABLE, 
	"REP_FECHA" DATE NOT NULL ENABLE, 
	"REP_VISITAS" NUMBER(*,0), 
	"REP_ASESORIAS" NUMBER(*,0), 
	"REP_CLIENTE_PRINCIPAL" VARCHAR2(50) NOT NULL ENABLE, 
	"REP_FECHA_INGRESO" DATE, 
	"REP_CAPACITACIONES" NUMBER(*,0), 
	 PRIMARY KEY ("REP_PRO_ID")
   ) ;

  CREATE TABLE "SERVICIOS" 
   (	"SER_IDSERVICIO" NUMBER(*,0) NOT NULL ENABLE, 
	"SER_DESRIPCION" VARCHAR2(50), 
	 CONSTRAINT "SERVICIOS_PK" PRIMARY KEY ("SER_IDSERVICIO")
   ) ;
   
     CREATE TABLE "TIPO_EVENTO" 
   (	"TEV_ID" NUMBER(*,0), 
	"VISITAS_VIS_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"VISITAS_PRO_PRO_RUT" VARCHAR2(11) NOT NULL ENABLE, 
	"VISITAS_USUARIOS_USR_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"VISITAS_CLIENTES_CLI_RUT" VARCHAR2(11) NOT NULL ENABLE, 
	"TEV_ID1" NUMBER NOT NULL ENABLE, 
	 CONSTRAINT "TEV_PK" PRIMARY KEY ("TEV_ID1")
   ) ;

  CREATE TABLE "TEV_ASE" 
   (	"ASESORIAS_ASE_ID1" NUMBER NOT NULL ENABLE, 
	"TIPO_EVENTO_TEV_ID1" NUMBER NOT NULL ENABLE, 
	 CONSTRAINT "TEV_ASE_PK" PRIMARY KEY ("ASESORIAS_ASE_ID1", "TIPO_EVENTO_TEV_ID1"), 
	 CONSTRAINT "TEV_ASE_TIPO_EVENTO_FK" FOREIGN KEY ("TIPO_EVENTO_TEV_ID1")
	  REFERENCES "TIPO_EVENTO" ("TEV_ID1") ENABLE
   );

  CREATE TABLE "TEV_CAP" 
   (	"TIPO_EVENTO_TEV_ID1" NUMBER NOT NULL ENABLE, 
	"CAPACITACIONES_CAP_ID1" NUMBER NOT NULL ENABLE, 
	 CONSTRAINT "TEV_CAP_PK" PRIMARY KEY ("TIPO_EVENTO_TEV_ID1", "CAPACITACIONES_CAP_ID1"), 
	 CONSTRAINT "TEV_CAP_TIPO_EVENTO_FK" FOREIGN KEY ("TIPO_EVENTO_TEV_ID1")
	  REFERENCES "TIPO_EVENTO" ("TEV_ID1") ENABLE
   ) ;



  CREATE TABLE "USUARIOS" 
   (	"USR_ID" NUMBER(*,0) NOT NULL ENABLE, 
	"USR_USERNAME" VARCHAR2(50) NOT NULL ENABLE, 
	"USR_CORREO" VARCHAR2(100) NOT NULL ENABLE, 
	"USR_NOMBRECOMPLETO" VARCHAR2(100) NOT NULL ENABLE, 
	"USR_PASSWORD" VARCHAR2(32) NOT NULL ENABLE, 
	"USR_TIPOUSUARIO" VARCHAR2(50) NOT NULL ENABLE, 
	"USR_IDPERFIL" NUMBER(*,0) NOT NULL ENABLE, 
	"USR_ESTADO" VARCHAR2(50), 
	 CONSTRAINT "USUARIOS_PK" PRIMARY KEY ("USR_ID")
 ) ;

  CREATE TABLE "VISITAS" 
   (	
      "VIS_ID" NUMBER(*,0) NOT NULL ENABLE, 
	   "VIS_FCREACION" DATE, 
	   "VIS_FCITA" DATE, 
	   "VIS_ID_CLI" NUMBER(*,0) NOT NULL ENABLE, 
	   "VIS_ID_PRO" NUMBER(*,0) NOT NULL ENABLE,
      CONSTRAINT "UQ_Visita" UNIQUE ("VIS_FCITA", "VIS_ID_CLI", "VIS_ID_PRO")
   ) ;

   CREATE TABLE REPORTES_ACCIDENTES(
    "REP_ACC_ID" NUMBER PRIMARY KEY,
    "REP_ACC_CLI_ID" NUMBER,
    "REP_ACC_FECHA" DATE,
    "REP_ACC_DESCRIPCION" VARCHAR2(500),
    
    CONSTRAINT FK_REPORTES_USUARIOS FOREIGN KEY (REP_ACC_CLI_ID) REFERENCES USUARIOS (USR_ID)
   );

   CREATE TABLE HISTORIAL_CHECKS(
      "HIS_CHECK_ID" NUMBER PRIMARY KEY,
      "HIS_CLI_ID" NUMBER,
      "HIS_FECHA" DATE,
      "HIS_DESCRIPCION" VARCHAR2(100),
   
      CONSTRAINT FK_HISTORIAL_USUARIOS FOREIGN KEY (HIS_CLI_ID) REFERENCES USUARIOS (USR_ID)
   );

   CREATE TABLE FACTURA_MENSUAL (
      "PAGO_MENS_ID" NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
      "PAGO_MENS_CLI" NUMBER,
      "PAGO_MENS_FECHA_GEN" DATE,
      "PAGO_MENS_ESTADO" NUMBER,
      "PAGO_MENS_TOTAL" NUMBER,
      "PAGO_MENS_FECHA_PAGO" DATE NULL,    

      CONSTRAINT PK_FACTURA_MENSUAL PRIMARY KEY (PAGO_MENS_ID),
      CONSTRAINT FK_FACTURA_MENSUAL_CLIENTES FOREIGN KEY (PAGO_MENS_CLI) REFERENCES USUARIOS (USR_ID)
   );

   CREATE TABLE DETALLE_FACTURA(
      "DETALLE_PAGOS_ID" NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
      "DETALLE_FACTURA_ID" NUMBER,
      "DETALLE_DESCRIPCION" VARCHAR2(100),
      "DETALLE_VALOR" NUMBER,

      CONSTRAINT PK_DETALLE_FACTURA PRIMARY KEY (DETALLE_PAGOS_ID),
      CONSTRAINT FK_DETALLE_FACTURA_MENSUALE FOREIGN KEY (DETALLE_FACTURA_ID) REFERENCES FACTURA_MENSUAL (PAGO_MENS_ID)
   );

   CREATE TABLE SOLICITUDES(
      "SOL_ID" NUMBER PRIMARY KEY,
      "SOL_CLI_ID" NUMBER,
      "SOL_PRO_ID" NUMBER,
      "SOL_DESCRIPCION" VARCHAR2(50),
      "SOL_ESTADO" NUMBER,
      "SOL_FECHA" DATE,
    
      CONSTRAINT FK_SOLICITUDES_CLIENTES FOREIGN KEY (SOL_CLI_ID) REFERENCES USUARIOS (USR_ID),
      CONSTRAINT FK_SOLICITUDES_PRO FOREIGN KEY (SOL_PRO_ID) REFERENCES USUARIOS (USR_ID)
   );

   CREATE TABLE PRECIOS_EXTRA(
    PRECIOS_ID NUMBER PRIMARY KEY,
    PRECIOS_ITEM VARCHAR2(100),
    PRECIOS_VALOR NUMBER NOT NULL
   ); 

   CREATE OR REPLACE EDITIONABLE TRIGGER "REPORTE_CLI" 
   BEFORE INSERT 
   ON  REPORTES_CLI 
   FOR EACH ROW
   
   DECLARE 
   V_FECHA DATE;
   V_VISITAS INTEGER;
   V_ASESORIAS INTEGER;
   V_PROPUESTAS INTEGER;
   V_ACCIDENTES INTEGER;
   V_CAPACITACIONES INTEGER;
   V_ID_CLI INTEGER;
   V_NOMBRE_PRO VARCHAR2(25);
   V_APELLIDO_PRO VARCHAR2(25);
   V_NOMBRE_COMPLETO VARCHAR2(50);

   BEGIN
   SELECT COUNT(*) into V_VISITAS FROM VISITAS WHERE VIS_ID_CLI = :NEW.rep_cli_id  and  vis_fcita between trunc(sysdate, 'MM') and last_day(sysdate);
   SELECT COUNT(*) into V_ASESORIAS FROM ASESORIAS WHERE ASE_ID_USUARIO = :NEW.rep_id_cli and  ase_fecha between trunc(sysdate,'MM') and last_day(sysdate);
   SELECT COUNT(*) INTO V_ACCIDENTES FROM ACCIDENTES WHERE ACC_ID_CLIENTE = :NEW.rep_id_cli AND ACC_ESTADO = 1 ;
   SELECT COUNT(*) INTO V_CAPACITACIONES FROM CAPACITACIONES WHERE CAP_ID_CLI = :NEW.REP_ID_CLI AND cap_fecha between trunc(sysdate,'MM') and last_day(sysdate);
   SELECT PRO_NOMBRE INTO V_NOMBRE_PRO FROM PRO WHERE PRO_CLI_ASIGNADO = :NEW.REP_ID_CLI;
   SELECT PRO_APELLIDO INTO v_apellido_pro FROM PRO WHERE PRO_CLI_ASIGNADO = :NEW.REP_ID_CLI;
   
   v_nombre_completo :=  V_NOMBRE_PRO ||' '|| V_APELLIDO_PRO;
   
   :NEW.rep_visitas := V_VISITAS;
   :NEW.rep_asesorias := V_ASESORIAS;
   :NEW.rep_accidentes := V_ACCIDENTES;
   :NEW.rep_capacitaciones := V_CAPACITACIONES;
   :NEW.rep_profesional := v_nombre_completo;
   
   END;
   /

   CREATE OR REPLACE EDITIONABLE TRIGGER "REPORTE_GLOBAL" 
   BEFORE INSERT 
   ON  REPORTES_GLOBAL
   FOR EACH ROW
    
   DECLARE 
   V_FECHA_INGRESO DATE;
   V_VISITAS INTEGER;
   V_ASESORIAS INTEGER;
   V_CAPACITACIONES INTEGER;
   V_ACCIDENTES INTEGER;
   V_PROS INTEGER;
   V_CLIENTES INTEGER;
   V_USUARIOS INTEGER;

   BEGIN
   SELECT COUNT(*) into V_VISITAS FROM VISITAS  ;
   SELECT COUNT(*) into V_ASESORIAS FROM ASESORIAS;
   SELECT COUNT(*) INTO V_CAPACITACIONES FROM CAPACITACIONES;
   SELECT COUNT(*) INTO V_ACCIDENTES FROM ACCIDENTES;
   SELECT COUNT(*) INTO V_CLIENTES FROM CLIENTES;
   SELECT COUNT(*) INTO V_PROS FROM PRO;


   :NEW.rep_visitas := V_VISITAS;
   :NEW.rep_asesorias := V_ASESORIAS;
   :NEW.rep_accidentes := V_ACCIDENTES;
   :NEW.rep_capacitaciones := V_CAPACITACIONES;
   :NEW.rep_clientes := V_CLIENTES;
   :NEW.rep_profesionales := V_PROS;

   END;
   /

   CREATE OR REPLACE EDITIONABLE TRIGGER "REPORTE_PRO" 
   BEFORE INSERT 
   ON  REPORTES_PRO
   FOR EACH ROW
   
   DECLARE 
   V_FECHA_INGRESO DATE;
   V_VISITAS INTEGER;
   V_ASESORIAS INTEGER;
   V_CAPACITACIONES INTEGER;
   V_ID_CLI INTEGER;
   V_NOMBRE_COMPLETO VARCHAR2(50);


   BEGIN
   SELECT COUNT(*) into V_VISITAS FROM VISITAS WHERE VIS_ID_PRO = :NEW.rep_id_pro and  vis_fcita between trunc(sysdate, 'MM') and last_day(sysdate) ;
   SELECT COUNT(*) into V_ASESORIAS FROM ASESORIAS WHERE ASE_ID_PRO = :NEW.rep_id_pro  and  ase_fecha between trunc(sysdate,'MM') and last_day(sysdate);
   SELECT COUNT(*) INTO V_CAPACITACIONES FROM CAPACITACIONES WHERE CAP_ID_PRO = :NEW.REP_ID_PRO AND cap_fecha between trunc(sysdate,'MM') and last_day(sysdate);
   SELECT PRO_FINGRESO INTO V_FECHA_INGRESO FROM PRO WHERE PRO_ID = :NEW.REP_ID_PRO;
   SELECT CLI_ID INTO V_ID_CLI FROM CLIENTES WHERE CLI_ID_PRO = :NEW.REP_ID_PRO;
   SELECT USR_NOMBRECOMPLETO INTO V_NOMBRE_COMPLETO FROM USUARIOS WHERE USR_TIPOUSUARIO = 'Cliente' and USR_IDPERFIL = V_ID_CLI;

   :NEW.rep_visitas := V_VISITAS;
   :NEW.rep_asesorias := V_ASESORIAS;
   :NEW.rep_fecha_ingreso := V_FECHA_INGRESO;
   :NEW.rep_capacitaciones := V_CAPACITACIONES;
   :NEW.rep_cliente_principal := V_NOMBRE_COMPLETO;

   END;
   /

   CREATE OR REPLACE EDITIONABLE TRIGGER "TEV_TEV_ID1_TRG" BEFORE
   INSERT ON tipo_evento
   FOR EACH ROW
   WHEN ( new.tev_id1 IS NULL ) BEGIN
   :new.tev_id1 := tev_tev_id1_seq.nextval;
   END;
   /

   CREATE OR REPLACE TRIGGER "INSERTAR_REPORTE_ACCIDENTE"
   BEFORE UPDATE OF ACC_ESTADO
   ON  ACCIDENTES
   FOR EACH ROW
   DECLARE
   V_ID_CLIENTE reportes_accidentes.rep_acc_cli_id%TYPE;
   V_ID_REPORTE reportes_accidentes.rep_acc_id%TYPE;
   V_DESCRIPCION  reportes_accidentes.rep_acc_descripcion%TYPE;
   V_ESTADO VARCHAR2(50);
   V_ACC_ESTADO accidentes.acc_estado%TYPE;
   BEGIN
   SELECT COUNT(*) INTO V_ID_REPORTE FROM reportes_accidentes;

   V_ESTADO := :OLD.ACC_ESTADO;
   V_ACC_ESTADO := :OLD.ACC_ESTADO;
   V_DESCRIPCION := CONCAT(:OLD.ACC_DESCRIPCION,' con estado 0');
   IF V_ESTADO > 0 THEN
      V_DESCRIPCION := CONCAT(:OLD.ACC_DESCRIPCION,'con estado 1');
   END IF;
   V_ID_CLIENTE := :OLD.ACC_ID_CLIENTE;
   V_ID_REPORTE := V_ID_REPORTE +1;
   INSERT INTO REPORTES_ACCIDENTES VALUES(V_ID_REPORTE,V_ID_CLIENTE,sysdate,V_DESCRIPCION);
   END;
   /

   CREATE OR REPLACE TRIGGER "INSERTAR_HISTORIAL_CHECKS"
   BEFORE UPDATE OF ACC_DESCRIPCION
   ON  ACCIDENTES
   FOR EACH ROW
   DECLARE
   V_ID_CLIENTE NUMBER;
   V_ID_HISTORAL_CHECK NUMBER;
   V_DESCRIPCION  accidentes.acc_descripcion%TYPE;
   BEGIN
   SELECT COUNT(*) INTO V_ID_HISTORAL_CHECK FROM historial_checks;

   V_DESCRIPCION := :OLD.ACC_DESCRIPCION;
   V_ID_CLIENTE := :OLD.ACC_ID_CLIENTE;
   V_ID_HISTORAL_CHECK := V_ID_HISTORAL_CHECK +1;
   INSERT INTO historial_checks VALUES(V_ID_HISTORAL_CHECK,V_ID_CLIENTE,sysdate,V_DESCRIPCION);
   END;
   /



